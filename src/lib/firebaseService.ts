import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  limit,
  DocumentData,
  QueryDocumentSnapshot 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { firestore, storage } from './firebase';

// Generic type for data models
export interface FirestoreModel {
  id?: string;
  [key: string]: any;
}

export class FirebaseService<T extends FirestoreModel> {
  private collectionName: string;
  
  constructor(collectionName: string) {
    this.collectionName = collectionName;
  }
  
  // Convert Firestore document to our model
  private fromFirestore(snapshot: QueryDocumentSnapshot<DocumentData>): T {
    const data = snapshot.data();
    return {
      ...data,
      id: snapshot.id
    } as T;
  }
  
  // Get all documents from a collection
  async getAll(): Promise<T[]> {
    const collectionRef = collection(firestore, this.collectionName);
    const snapshot = await getDocs(collectionRef);
    return snapshot.docs.map(doc => this.fromFirestore(doc));
  }
  
  // Get a single document by ID
  async getById(id: string): Promise<T | null> {
    const docRef = doc(firestore, this.collectionName, id);
    const snapshot = await getDoc(docRef);
    
    if (!snapshot.exists()) {
      return null;
    }
    
    return this.fromFirestore(snapshot as QueryDocumentSnapshot<DocumentData>);
  }
  
  // Query documents with filters
  async query(
    filters: Array<{ field: string; operator: string; value: any }>,
    sortField?: string,
    sortDirection?: 'asc' | 'desc',
    limitCount?: number
  ): Promise<T[]> {
    const collectionRef = collection(firestore, this.collectionName);
    
    let q = query(collectionRef);
    
    // Add filters
    filters.forEach(filter => {
      q = query(q, where(filter.field, filter.operator as any, filter.value));
    });
    
    // Add sorting
    if (sortField) {
      q = query(q, orderBy(sortField, sortDirection || 'asc'));
    }
    
    // Add limit
    if (limitCount) {
      q = query(q, limit(limitCount));
    }
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => this.fromFirestore(doc));
  }
  
  // Create a new document
  async create(data: Omit<T, 'id'>): Promise<T> {
    const collectionRef = collection(firestore, this.collectionName);
    const docRef = await addDoc(collectionRef, data);
    
    return {
      ...data,
      id: docRef.id
    } as T;
  }
  
  // Update an existing document
  async update(id: string, data: Partial<T>): Promise<void> {
    const docRef = doc(firestore, this.collectionName, id);
    const dataWithoutId = { ...data };
    delete dataWithoutId.id;
    
    await updateDoc(docRef, dataWithoutId as any);
  }
  
  // Delete a document
  async delete(id: string): Promise<void> {
    const docRef = doc(firestore, this.collectionName, id);
    await deleteDoc(docRef);
  }
  
  // Upload a file to Firebase Storage
  async uploadFile(
    file: File, 
    path: string = this.collectionName
  ): Promise<string> {
    const storageRef = ref(storage, `${path}/${Date.now()}-${file.name}`);
    await uploadBytes(storageRef, file);
    
    return await getDownloadURL(storageRef);
  }
  
  // Delete a file from Firebase Storage
  async deleteFile(url: string): Promise<void> {
    const storageRef = ref(storage, url);
    await deleteObject(storageRef);
  }
}

// Example usage:
// const projectsService = new FirebaseService<Project>('projects');
// const projects = await projectsService.getAll();