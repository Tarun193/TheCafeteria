# Generated by Django 4.2.1 on 2023-06-22 12:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('TheCafeteriaAPI', '0013_order_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='status',
            field=models.CharField(blank=True, default='Confirmed', max_length=20, null=True),
        ),
    ]
