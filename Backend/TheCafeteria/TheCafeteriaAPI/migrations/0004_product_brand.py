# Generated by Django 4.2.1 on 2023-06-07 12:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('TheCafeteriaAPI', '0003_brand'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='Brand',
            field=models.ForeignKey(blank=True, default=None, on_delete=django.db.models.deletion.CASCADE, to='TheCafeteriaAPI.brand'),
        ),
    ]
