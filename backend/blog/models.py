from django.db import models
from django.contrib.auth.models import User 
from django.core.validators import MaxValueValidator, MinValueValidator


class Post(models.Model):
    fkCreator = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=60, blank=False)
    topic_1 = models.CharField(max_length=30, blank=False)
    topic_2 = models.CharField(max_length=30, blank=True)
    desc = models.TextField(max_length=1024, blank=False)
    stars = models.IntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(5)])

    def __str__(self):
        return f"ID: {self.pk} - created by: {self.fkCreator} - title: {self.title}"

class CommentOnPost(models.Model):
    fkCreator = models.ForeignKey(User, on_delete=models.CASCADE)
    fkPost = models.ForeignKey(Post, on_delete=models.CASCADE)
    text = models.TextField(max_length=1024, blank=False)
    stars = models.IntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(5)])

    def __str__(self):
        return f"ID: {self.pk} - creator: {self.fkCreator} postID {self.fkPost.pk}"
