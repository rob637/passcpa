import re
with open('scripts/course-factory.py', 'r') as f:
    content = f.read()

replacement = """# Firebase Admin SDK Initialization
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

DB = None
cred_path = os.getenv('GOOGLE_APPLICATION_CREDENTIALS', 'serviceAccountKey.json')
if os.path.exists(cred_path):
    try:
        cred = credentials.Certificate(cred_path)
        firebase_admin.initialize_app(cred)
        DB = firestore.client()
        print("✅ Connected to Firestore via Admin SDK.")
    except Exception as e:
        print(f"⚠️ Failed to initialize Firebase Admin: {e}")
else:
    print("⚠️ WARNING: serviceAccountKey.json not found. Firestore sync disabled.")

# ─── FIRESTORE SDK HELPERS ───────────────────────────────────────────────

def firestore_set(collection: str, doc_id: str, data: dict) -> bool:
    \"\"\"Write a document to Firestore via Admin SDK. Returns True on success.\"\"\"
    if not DB: return False
    try:
        DB.collection(collection).document(doc_id).set(data)
        return True
    except Exception as e:
        print(f"  ⚠ Firestore write failed: {str(e)[:100]}")
        return False

def firestore_get(collection: str, doc_id: str) -> dict | None:
    \"\"\"Read a document from Firestore via Admin SDK.\"\"\"
    if not DB: return None
    try:
        doc = DB.collection(collection).document(doc_id).get()
        if doc.exists:
            return doc.to_dict()
        return None
    except Exception:
        return None

def firestore_query_by_status(collection: str, status: str) -> list[dict]:
    \"\"\"Query Firestore for documents with a specific status field.\"\"\"
    if not DB: return []
    try:
        docs = DB.collection(collection).where(filter=firestore.FieldFilter("status", "==", status)).order_by("createdAt", direction=firestore.Query.ASCENDING).get()
        results = []
        for doc in docs:
            d = doc.to_dict()
            d['id'] = doc.id
            results.append(d)
        return results
    except Exception as e:
        print(f"  ⚠ Firestore query failed: {str(e)[:100]}")
        return []
"""

pattern = re.compile(r'# Firebase config for Firestore REST API.*?def firestore_query_by_status.*?return results\n    except Exception as e:\n        print\(f"  ⚠ Firestore query failed: {str\(e\)\[:100\]}"\)\n        return \[\]', re.DOTALL)

new_content = pattern.sub(replacement, content)
with open('scripts/course-factory.py', 'w') as f:
    f.write(new_content)

