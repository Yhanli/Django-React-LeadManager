# Generated by Django 3.0.8 on 2020-07-05 12:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('leads', '0002_lead_owner'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lead',
            name='email',
            field=models.EmailField(max_length=100),
        ),
    ]
