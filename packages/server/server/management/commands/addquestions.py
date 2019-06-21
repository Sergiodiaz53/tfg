import os

from django.core.management.base import BaseCommand, CommandError


class Command(BaseCommand):
    help = 'Add questions'

    def handle(self, *rgs, **options):
        media_path = os.path.join(os.getcwd(), 'media')
        fixtures_path = os.path.join(media_path, 'fixtures')
        questions_path = os.path.join(fixtures_path, 'questions')

        # TODO: Check path ./media/fixtures/questions exists
        self.stdout.write(os.listdir())
