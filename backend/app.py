from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
from supabase import create_client, Client
from datetime import datetime
from typing import Optional, Dict, Any

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Initialize Supabase client
supabase: Client = create_client(
    os.getenv("SUPABASE_URL"),
    os.getenv("SUPABASE_KEY")
)

def validate_task_data(data: Dict[str, Any]) -> tuple[bool, Optional[str]]:
    """Validate task data before insertion or update."""
    required_fields = ['title']
    for field in required_fields:
        if field not in data:
            return False, f"Missing required field: {field}"
    
    if 'priority' in data and data['priority'] not in ['low', 'medium', 'high']:
        return False, "Invalid priority level"
    
    if 'progress' in data:
        try:
            progress = int(data['progress'])
            if not (0 <= progress <= 100):
                return False, "Progress must be between 0 and 100"
        except ValueError:
            return False, "Progress must be an integer"
    
    return True, None

@app.route("/api/health", methods=["GET"])
def health_check():
    """Check if the server is running."""
    return jsonify({"status": "healthy", "message": "Server is running"})

@app.route("/api/tasks", methods=["GET"])
def get_tasks():
    """Get all tasks for the authenticated user."""
    try:
        user_id = request.headers.get('user-id')  # In production, get this from auth token
        if not user_id:
            return jsonify({"error": "User ID required"}), 401

        response = supabase.table("tasks") \
            .select("*") \
            .eq("user_id", user_id) \
            .order("due_date", desc=False) \
            .execute()
        
        return jsonify(response.data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/tasks", methods=["POST"])
def create_task():
    """Create a new task."""
    try:
        user_id = request.headers.get('user-id')  # In production, get this from auth token
        if not user_id:
            return jsonify({"error": "User ID required"}), 401

        task_data = request.json
        is_valid, error = validate_task_data(task_data)
        if not is_valid:
            return jsonify({"error": error}), 400

        task_data['user_id'] = user_id
        response = supabase.table("tasks").insert(task_data).execute()
        return jsonify(response.data[0]), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/tasks/<task_id>", methods=["PUT"])
def update_task(task_id):
    """Update an existing task."""
    try:
        user_id = request.headers.get('user-id')  # In production, get this from auth token
        if not user_id:
            return jsonify({"error": "User ID required"}), 401

        task_data = request.json
        is_valid, error = validate_task_data(task_data)
        if not is_valid:
            return jsonify({"error": error}), 400

        # Verify task ownership
        existing_task = supabase.table("tasks") \
            .select("user_id") \
            .eq("id", task_id) \
            .single() \
            .execute()

        if not existing_task.data or existing_task.data['user_id'] != user_id:
            return jsonify({"error": "Task not found or unauthorized"}), 404

        response = supabase.table("tasks") \
            .update(task_data) \
            .eq("id", task_id) \
            .execute()
        
        return jsonify(response.data[0])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/tasks/<task_id>", methods=["DELETE"])
def delete_task(task_id):
    """Delete a task."""
    try:
        user_id = request.headers.get('user-id')  # In production, get this from auth token
        if not user_id:
            return jsonify({"error": "User ID required"}), 401

        # Verify task ownership
        existing_task = supabase.table("tasks") \
            .select("user_id") \
            .eq("id", task_id) \
            .single() \
            .execute()

        if not existing_task.data or existing_task.data['user_id'] != user_id:
            return jsonify({"error": "Task not found or unauthorized"}), 404

        response = supabase.table("tasks") \
            .delete() \
            .eq("id", task_id) \
            .execute()
        
        return jsonify({"message": "Task deleted successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/tasks/<task_id>/complete", methods=["POST"])
def complete_task(task_id):
    """Mark a task as complete and check for achievements."""
    try:
        user_id = request.headers.get('user-id')  # In production, get this from auth token
        if not user_id:
            return jsonify({"error": "User ID required"}), 401

        # Update task completion
        response = supabase.table("tasks") \
            .update({"completed": True, "progress": 100}) \
            .eq("id", task_id) \
            .eq("user_id", user_id) \
            .execute()

        if not response.data:
            return jsonify({"error": "Task not found or unauthorized"}), 404

        # Check for achievements (example: completing first task)
        completed_tasks = supabase.table("tasks") \
            .select("id") \
            .eq("user_id", user_id) \
            .eq("completed", True) \
            .execute()

        if len(completed_tasks.data) == 1:
            supabase.table("achievements").insert({
                "user_id": user_id,
                "achievement_name": "First Task Complete",
                "description": "Completed your first task!",
                "points": 100
            }).execute()

        return jsonify(response.data[0])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True) 