import re


def clean_phone_number(phone: str) -> str:
    """
    Очищает номер телефона, оставляя только ведущий + и цифры.
    Если номер начинается с 8, заменяет его на +7.
    Если номер начинается с 9, добавляет +7 в начало.
    """
    # Убираем все лишние символы, оставляем только цифры и знак +
    cleaned_phone = re.sub(r'[^0-9+]', '', phone)

    # Если номер начинается с "8", заменяем на "+7"
    if cleaned_phone.startswith('8'):
        cleaned_phone = '+7' + cleaned_phone[1:]
    # Если номер начинается с "9", добавляем "+7" в начало
    elif cleaned_phone.startswith('9'):
        cleaned_phone = '+7' + cleaned_phone

    # Если номер начинается с "+" и не начинается с "8" или "9", оставляем как есть
    elif not cleaned_phone.startswith('+'):
        cleaned_phone = f"+{cleaned_phone}"

    return cleaned_phone
