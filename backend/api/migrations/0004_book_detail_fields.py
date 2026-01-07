from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_link'),
    ]

    operations = [
        migrations.AddField(
            model_name='book',
            name='author_first_name',
            field=models.CharField(blank=True, max_length=150),
        ),
        migrations.AddField(
            model_name='book',
            name='author_last_name',
            field=models.CharField(blank=True, max_length=150),
        ),
        migrations.AddField(
            model_name='book',
            name='detail_content',
            field=models.TextField(blank=True),
        ),
    ]
