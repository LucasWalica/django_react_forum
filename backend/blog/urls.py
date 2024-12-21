from django.urls import path 
from .views import ( 
    CreateCommentView,
    CreatePostView,
    DeleteCommentView,
    DeletePostView,
    PostListView,
    PostListViewBySearch,
    PostDetaildView
)

urlpatterns = [
    path('posts/', PostListView.as_view(), name='post_list'),
    path('posts/search/', PostListViewBySearch.as_view(), name='post_list_search'),
    path('post/create/', CreatePostView.as_view(), name="create_post"),
    path('post/<int:postID>/', PostDetaildView.as_view(), name='post_detail'),
    path('post/<int:pk>/delete/',DeletePostView.as_view(), name='post_delete'),
    path('comment/create/', CreateCommentView.as_view(), name='create_comment'),
    path('comment/<int:pk>/delete/', DeleteCommentView.as_view(), name='comment_delete')
]
