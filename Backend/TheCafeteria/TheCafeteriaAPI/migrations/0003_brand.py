# Generated by Django 4.2.1 on 2023-06-07 12:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('TheCafeteriaAPI', '0002_product_productimages'),
    ]

    operations = [
        migrations.CreateModel(
            name='Brand',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('logo', models.ImageField(upload_to='BrandImages/')),
            ],
        ),
    ]