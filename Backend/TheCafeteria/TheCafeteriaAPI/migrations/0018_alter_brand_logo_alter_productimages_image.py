# Generated by Django 4.2.1 on 2023-06-26 12:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('TheCafeteriaAPI', '0017_alter_brand_logo_alter_productimages_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='brand',
            name='logo',
            field=models.ImageField(upload_to='BrandImages/'),
        ),
        migrations.AlterField(
            model_name='productimages',
            name='image',
            field=models.ImageField(upload_to='ProductImages/'),
        ),
    ]
