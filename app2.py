# Add these imports at the top if not already present
from flask import render_template

# Add these endpoints to app.py

@app.route('/api/jobs', methods=['GET'])
def get_jobs():
    """Endpoint to retrieve all jobs data"""
    try:
        if recommender is None:
            # If recommender is not initialized, try to load data directly
            _, jobs_df = load_data_from_json()
        else:
            jobs_df = recommender.jobs_df
        
        # Convert DataFrame to list of dictionaries for JSON serialization
        # Handle skills list properly
        jobs_list = []
        for _, job in jobs_df.iterrows():
            job_dict = job.to_dict()
            # Ensure skills is a list for proper JSON serialization
            if isinstance(job_dict['skills'], list):
                job_dict['skills'] = job_dict['skills']
            else:
                # Handle any unexpected format
                job_dict['skills'] = str(job_dict['skills']).split(',') if job_dict['skills'] else []
            jobs_list.append(job_dict)
        
        return jsonify({
            'count': len(jobs_list),
            'jobs': jobs_list
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/users', methods=['GET'])
def get_users():
    """Endpoint to retrieve all users data"""
    try:
        if recommender is None:
            # If recommender is not initialized, try to load data directly
            users_df, _ = load_data_from_json()
        else:
            users_df = recommender.users_df
        
        # Convert DataFrame to list of dictionaries for JSON serialization
        # Handle skills list properly
        users_list = []
        for _, user in users_df.iterrows():
            user_dict = user.to_dict()
            # Ensure skills is a list for proper JSON serialization
            if isinstance(user_dict['skills'], list):
                user_dict['skills'] = user_dict['skills']
            else:
                # Handle any unexpected format
                user_dict['skills'] = str(user_dict['skills']).split(',') if user_dict['skills'] else []
            users_list.append(user_dict)
        
        return jsonify({
            'count': len(users_list),
            'users': users_list
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Optional: Add a parameter to limit the number of results
@app.route('/api/jobs/<int:limit>', methods=['GET'])
def get_limited_jobs(limit):
    """Endpoint to retrieve a limited number of jobs"""
    try:
        if recommender is None:
            _, jobs_df = load_data_from_json()
        else:
            jobs_df = recommender.jobs_df
        
        # Apply limit
        limited_jobs_df = jobs_df.head(limit)
        
        # Convert DataFrame to list of dictionaries
        jobs_list = []
        for _, job in limited_jobs_df.iterrows():
            job_dict = job.to_dict()
            if isinstance(job_dict['skills'], list):
                job_dict['skills'] = job_dict['skills']
            else:
                job_dict['skills'] = str(job_dict['skills']).split(',') if job_dict['skills'] else []
            jobs_list.append(job_dict)
        
        return jsonify({
            'count': len(jobs_list),
            'jobs': jobs_list
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/users/<int:limit>', methods=['GET'])
def get_limited_users(limit):
    """Endpoint to retrieve a limited number of users"""
    try:
        if recommender is None:
            users_df, _ = load_data_from_json()
        else:
            users_df = recommender.users_df
        
        # Apply limit
        limited_users_df = users_df.head(limit)
        
        # Convert DataFrame to list of dictionaries
        users_list = []
        for _, user in limited_users_df.iterrows():
            user_dict = user.to_dict()
            if isinstance(user_dict['skills'], list):
                user_dict['skills'] = user_dict['skills']
            else:
                user_dict['skills'] = str(user_dict['skills']).split(',') if user_dict['skills'] else []
            users_list.append(user_dict)
        
        return jsonify({
            'count': len(users_list),
            'users': users_list
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
