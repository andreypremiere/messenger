from dataclasses import dataclass, field
from uuid import UUID
from datetime import datetime


@dataclass
class User:
    user_id: UUID
    nickname: str
    email: str
    number_phone: str
    visibility_number_phone: bool = field(default=False)
    visibility_email: bool = field(default=False)
    created_at: datetime = field(default_factory=datetime.utcnow)
    last_enter: datetime = field(default_factory=datetime.utcnow)
    url_avatar: str = field(default="")
