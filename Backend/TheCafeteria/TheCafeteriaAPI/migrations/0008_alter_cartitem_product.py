# Generated by Django 4.2.1 on 2023-06-15 00:59

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('TheCafeteriaAPI', '0007_alter_cartitem_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cartitem',
            name='product',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='TheCafeteriaAPI.product'),
        ),
    ]
