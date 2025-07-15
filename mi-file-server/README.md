# AWS File Server

A simple file server application using AWS S3 for storage with a REST API and a responsive frontend interface.

## Features

- Upload files to AWS S3
- List all uploaded files
- Download files
- Delete files
- Responsive UI with drag-and-drop file upload

## Technologies Used

- **Backend**:
  - Spring Boot 2.7.14
  - AWS SDK 2.20.56
  - Java 11

- **Frontend**:
  - HTML5
  - CSS3
  - JavaScript (Vanilla)
  - Font Awesome for icons

## Prerequisites

- Java 11 or higher
- Maven
- AWS Account with S3 access
- AWS credentials configured

## Configuration

The application uses configuration properties defined in `application.yml`. An example configuration file (`application-example.yml`) is provided as a template:

```yaml
aws:
  s3:
    bucket-name: your-s3-bucket-name
    region: your-aws-region
  access-key: ${AWS_ACCESS_KEY_ID:}
  secret-key: ${AWS_SECRET_ACCESS_KEY:}

file:
  upload:
    max-size: 10MB
    allowed-types: jpg,jpeg,png,pdf,txt,doc,docx
```

### Required Configuration:

1. Create your own `application.yml` file based on the example template
2. Set your actual S3 bucket name and AWS region
3. Set the following environment variables:
   - `AWS_ACCESS_KEY_ID`: Your AWS access key
   - `AWS_SECRET_ACCESS_KEY`: Your AWS secret key

> **Note**: The `application.yml` file is excluded from version control via `.gitignore` to protect sensitive information.

## Running the Application

1. Clone the repository
2. Set the AWS environment variables:
   ```
   # PowerShell
   $env:AWS_ACCESS_KEY_ID = "your-access-key-id"
   $env:AWS_SECRET_ACCESS_KEY = "your-secret-access-key"

   # Command Prompt
   set AWS_ACCESS_KEY_ID=your-access-key-id
   set AWS_SECRET_ACCESS_KEY=your-secret-access-key
   ```
3. Navigate to the project directory
4. Run the application:
   ```
   mvn spring-boot:run
   ```
5. Open a web browser and go to `http://localhost:8080`

## API Endpoints

- `GET /api/files`: List all files
- `POST /api/files/upload`: Upload a file
- `GET /api/files/download/{fileId}`: Download a file
- `DELETE /api/files/{fileId}`: Delete a file
- `GET /api/files/{fileId}/info`: Get file information
- `GET /api/files/health`: Health check

## Frontend Usage

1. **Upload Files**:
   - Click on the upload area or drag and drop files
   - Select a file and click the "Upload File" button

2. **View Files**:
   - All uploaded files are displayed in the "Your Files" section

3. **Download Files**:
   - Click the download button next to a file

4. **Delete Files**:
   - Click the delete button next to a file
   - Confirm the deletion when prompted

## Limitations

- Only the following file types are allowed: jpg, jpeg, png, pdf, txt, doc, docx
- Maximum file size: 10MB

## License

This project is licensed under the MIT License.
