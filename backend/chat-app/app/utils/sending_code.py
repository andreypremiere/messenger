import os
import smtplib
from email.message import EmailMessage
from dotenv import load_dotenv

load_dotenv()


def send_email(email, code):
    """Отправка кода на email через SMTP с Яндекс Почты."""
    msg = EmailMessage()
    msg.set_content(f"Your verification code: {code}")
    msg["Subject"] = "Verification Code"
    msg["From"] = f"Chat-FTC <{os.getenv('EMAIL_USER')}>"
    msg["To"] = email

    try:
        with smtplib.SMTP_SSL("smtp.yandex.ru", 465) as server:
            server.login(os.getenv("EMAIL_USER"), os.getenv("EMAIL_PASSWORD"))
            server.send_message(msg)
        print("Email sent successfully!")
    except Exception as e:
        print(f"Error occurred: {e}")


