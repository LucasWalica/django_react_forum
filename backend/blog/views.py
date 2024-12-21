from django.shortcuts import render
from rest_framework import generics
from .models import Post, CommentOnPost
from .serializers import CommentOnPostSerializer, PostSerializer, getPostSerializer, getCommentOnPostSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import NotFound

# Create your views here.
class CreatePostView(generics.CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(fkCreator=user)

# a post need to exists
class CreateCommentView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = CommentOnPost.objects.all()
    serializer_class = CommentOnPostSerializer

    def perform_create(self, serializer):
        user = self.request.user
        post_id = self.request.data.get('fkPost') 
        text = self.request.data.get('text')
        stars =  self.request.data.get('stars')
        try:
            post = Post.objects.get(pk=post_id)
        except Post.DoesNotExist:
            raise NotFound(detail="Post does not exist.")
        
        serializer.save(fkCreator=user, fkPost=post, text=text, stars=stars)


# it need to produce  a query that returns all the comments 
# on the post
class PostDetaildView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = getPostSerializer

    def get_object(self):
        try:
            post_id = self.kwargs.get('postID')
            return Post.objects.get(pk=post_id)
        except Post.DoesNotExist:
            raise NotFound(detail="Post not found.")
    
    def get(self, request, *args, **kwargs):
        post = self.get_object()
        comments = CommentOnPost.objects.filter(fkPost=post)
        return Response({
            "post":getPostSerializer(post).data,
            "comments":getCommentOnPostSerializer(comments, many=True).data
        })

class PostListView(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = getPostSerializer
    permission_classes = [IsAuthenticated]

class PostListViewBySearch(generics.ListAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):
        query = self.request.query_params.get('search', '')
        return Post.objects.filter(title__icontains=query)

class DeletePostView(generics.DestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class DeleteCommentView(generics.DestroyAPIView):
    queryset = CommentOnPost.objects.all()
    serializer_class = CommentOnPostSerializer