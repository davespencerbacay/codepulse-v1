import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogImage } from '../models/image.model';
import { environment } from '../../../environments/environment';
import { HttpClient, httpResource, HttpResourceRef } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ImageSelectorService {
  showImageSelector = signal<boolean>(false);
  http = inject(HttpClient);
  selectedImage = signal<string | null>(null);

  displayImageSelector() {
    this.showImageSelector.set(true);
  }

  hideImageSelector() {
    this.showImageSelector.set(false);
  }

  uploadImage(file: File, name: string, title: string): Observable<BlogImage> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', name);
    formData.append('title', title);

    return this.http.post<BlogImage>(`${environment.apiBaseUrl}/api/images/upload`, formData);
  }

  getAllImages(id: WritableSignal<string | undefined>): HttpResourceRef<BlogImage[] | undefined> {
    return httpResource<BlogImage[]>(() => {
      id();
      return `${environment.apiBaseUrl}/api/images`;
    });
  }

  selectImage(imageUrl: string) {
    this.selectedImage.set(imageUrl);
    this.hideImageSelector();
  }
}
