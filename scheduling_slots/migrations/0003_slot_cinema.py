# Generated by Django 3.1.5 on 2021-01-27 17:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('cinemas', '0001_initial'),
        ('scheduling_slots', '0002_remove_slot_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='slot',
            name='cinema',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='slots', to='cinemas.cinema'),
            preserve_default=False,
        ),
    ]
