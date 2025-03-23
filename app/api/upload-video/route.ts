import { NextRequest, NextResponse } from 'next/server';
import { admin, initAdmin } from '@/lib/firebase-admin';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

// Initialize Firebase Admin
initAdmin();

export async function POST(request: NextRequest) {
  try {
    // Verify the user is authenticated
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    let decodedToken;
    try {
      decodedToken = await admin.auth().verifyIdToken(token);
    } catch (error) {
      console.error('Error verifying auth token:', error);
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const userId = decodedToken.uid;
    
    // Get form data with the video file
    const formData = await request.formData();
    const videoFile = formData.get('video') as File;
    
    if (!videoFile) {
      return NextResponse.json({ error: 'No video file provided' }, { status: 400 });
    }
    
    // Create a unique filename
    const timestamp = Date.now();
    const fileExtension = videoFile.name.substring(videoFile.name.lastIndexOf('.'));
    const filename = `${userId}_${timestamp}${fileExtension}`;
    
    // Ensure the video directory exists
    const videoDir = join(process.cwd(), 'public', 'video');
    try {
      await mkdir(videoDir, { recursive: true });
    } catch (error) {
      console.error('Error creating video directory:', error);
    }
    
    // Save the file to the public/video folder
    const filePath = join(videoDir, filename);
    const buffer = Buffer.from(await videoFile.arrayBuffer());
    
    await writeFile(filePath, buffer);
    
    // Return the path where the file is accessible from the browser
    const publicPath = `/video/${filename}`;
    
    console.log(`Video uploaded successfully: ${publicPath}`);
    
    return NextResponse.json({
      success: true,
      filePath: publicPath
    });
    
  } catch (error) {
    console.error('Error uploading video:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to upload video' 
    }, { status: 500 });
  }
} 