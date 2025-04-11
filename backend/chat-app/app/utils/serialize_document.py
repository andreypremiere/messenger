def serialize_document(doc):
    if not doc:
        return doc

    doc["_id"] = str(doc["_id"])

    for field in ["createdAt", "updatedAt", "timestamp"]:
        if field in doc and doc[field]:
            doc[field] = doc[field].isoformat()

    return doc
