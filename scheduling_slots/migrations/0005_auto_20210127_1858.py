# Generated by Django 3.1.5 on 2021-01-27 18:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('films', '0003_auto_20210127_1844'),
        ('scheduling_slots', '0004_slot_film'),
    ]

    operations = [
        migrations.AlterField(
            model_name='slot',
            name='film',
            field=models.ForeignKey(blank=True, default='00 00:02:00', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='slots', to='films.film'),
        ),
    ]