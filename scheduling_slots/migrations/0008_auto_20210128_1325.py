# Generated by Django 3.1.5 on 2021-01-28 13:25

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('films', '0006_film_creator'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('scheduling_slots', '0007_slot_scheduled_by'),
    ]

    operations = [
        migrations.AlterField(
            model_name='slot',
            name='film',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='slots', to='films.film'),
        ),
        migrations.AlterField(
            model_name='slot',
            name='scheduled_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='scheduled_slots', to=settings.AUTH_USER_MODEL),
        ),
    ]
