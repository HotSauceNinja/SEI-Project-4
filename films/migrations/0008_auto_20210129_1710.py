# Generated by Django 3.1.5 on 2021-01-29 17:10

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('sections', '0001_initial'),
        ('films', '0007_auto_20210129_1705'),
    ]

    operations = [
        migrations.AlterField(
            model_name='film',
            name='creator',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.DO_NOTHING, related_name='posted_films', to='jwt_auth.user'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='film',
            name='section',
            field=models.ManyToManyField(blank=True, null=True, related_name='films', to='sections.Section'),
        ),
    ]
