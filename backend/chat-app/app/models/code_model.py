from dataclasses import dataclass
from uuid import UUID
from datetime import datetime


@dataclass
class CodeConfirmation:
    code_id: UUID
    email_code: str
    number_phone_code: str
    expire_time: datetime
    user_id: UUID
