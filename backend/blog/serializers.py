from rest_framework import serializers
from  .models import CommentOnPost, Post


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post 
        fields = ['title', 'topic_1', 'topic_2', 'desc', 'stars']
    
    def create(self, validated_data):
        post = Post.objects.create(**validated_data)
        return post

class getPostSerializer(serializers.ModelSerializer):   
    creatorName = serializers.CharField(source='fkCreator.username', read_only=True)
    class Meta:
        model = Post
        fields = ['id', 'creatorName', 'title', 'topic_1', 'topic_2', 'desc', 'stars']

class CommentOnPostSerializer(serializers.ModelSerializer):
    class Meta: 
        model = CommentOnPost
        fields = ['fkPost', 'text', 'stars', 'fkCreator']
        read_only_fields = ['fkCreator']
    
    def create(self, validated_data):
        comment = CommentOnPost.objects.create(**validated_data)
        return comment
    
class getCommentOnPostSerializer(serializers.ModelSerializer):
    creatorName = serializers.CharField(source="fkCreator.username", read_only=True)
    class Meta:
        model = CommentOnPost
        fields = ['pk', 'creatorName', 'fkPost', 'text', 'stars']