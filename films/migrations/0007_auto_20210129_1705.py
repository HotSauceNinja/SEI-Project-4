# Generated by Django 3.1.5 on 2021-01-29 17:05

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('films', '0006_film_creator'),
    ]

    operations = [
        migrations.AlterField(
            model_name='film',
            name='creator',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='posted_films', to=settings.AUTH_USER_MODEL),
        ),
    ]