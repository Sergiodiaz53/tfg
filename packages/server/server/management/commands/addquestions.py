import os

from django.core.management.base import BaseCommand, CommandError
from server.models import QuestionLevel, Question


class Command(BaseCommand):
    help = 'Add questions'

    def handle(self, *rgs, **options):
        media_path = os.path.join(os.getcwd(), 'media')
        questions_path = os.path.join(media_path, 'questions')

        for dir in os.listdir(questions_path):
            question_level_path = os.path.join(questions_path, dir)

            if os.path.isdir(question_level_path):
                self.save_question_level(question_level_path)

    def save_question_level(self, path):
        level = path.split(os.path.sep)[-1]
        question_level = QuestionLevel.objects.get_or_create(
            level=level
        )[0]

        for question in os.listdir(path):
            question_path = os.path.join(path, question)

            if os.path.isfile(question_path):
                self.save_question(question_level, question_path)

    def save_question(self, question_level, question_path):
        media_path = question_path.replace(os.getcwd(), '')
        question_name = media_path.split(os.path.sep)[-1]
        correct_answer = question_name[0:1]

        answers = {
            'I': 'left',
            'D': 'right'
        }

        question = Question.objects.filter(
            image=media_path
        )

        if not question:
            Question(
                image=media_path,
                correct_answer=answers[correct_answer],
                question_level=question_level
            ).save()
