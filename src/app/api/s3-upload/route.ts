import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
    region: process.env.AWS_S3_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY!
    },
});

const uploadFileToS3 = async (file: Buffer, fileName: string, contentType: string) => {
    const fileKey = `Product/${fileName}-${Date.now()}`;

    const uploadParams = {
        Bucket: process.env.AWS_S3_BUCKET_NAME!,
        Key: fileKey,
        Body: file,
        ContentType: contentType
    };

    try {
        const command = new PutObjectCommand(uploadParams);
        await s3Client.send(command);
        return fileKey; // Returning the full file key
    } catch (error) {
        console.error('Error uploading file to S3:', error);
        throw new Error('Error uploading file to S3');
    }
};

export const POST = async (req: NextRequest) => {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File | null;

        if (!file) {
            return NextResponse.json({ error: 'File is required.' }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        if (!(file instanceof File)) {
            return NextResponse.json({ error: 'Invalid file.' }, { status: 400 });
        }

        const fileKey = await uploadFileToS3(buffer, file.name, file.type);
        const imageUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${fileKey}`;

        return NextResponse.json({ success: true, imageUrl }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error uploading file.' }, { status: 500 });
    }
};
