Users are welcome to post anything they'd like to the blog and mark whether they'd want to keep it private or public. All user info will be encrypted for security and only accessed if they have the correct, corresponding token.
    
    Schemas:
        - User Schema
        - username: string, required
        - email: string, required
        - birthday: date, required
        - age: number
        - password: string, required
    -Blog Schema
        - created_by: string, required
        - created_at: date, required
        - blog_title: string, required
        - blog_content: string, required
        - private: boolean, required
        
        Packages:
    "bcrypt": "^5.0.1",
    "dotenv": "^16.0.1",
    "express": "^4.18.1",
    "express-validator": "^6.14.1",
    "helmet": "^5.1.0",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^6.3.8",
    "morgan": "^1.10.0"
    
    Uses: MongoDB, Postman
    
