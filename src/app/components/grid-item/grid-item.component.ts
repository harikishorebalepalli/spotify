import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid-item',
  templateUrl: './grid-item.component.html',
  styleUrls: ['./grid-item.component.scss'],
})
export class GridItemComponent implements OnInit {
  @Input() item: any;
  subText: any;

  constructor() {}

  ngOnInit(): void {
    this.getArtistNames();
  }

  getImage() {
    let images =
      this.item.type == 'track' ? this.item.album.images : this.item.images;
    if (images.length) return images?.[0]?.url;
    else return '../../../assets/images/noimage.png';
  }

  getArtistNames() {
    this.subText =
      'by ' +
      this.item.artists
        ?.map((artist: any) => artist.name)
        ?.slice(0, 2)
        .join(', ');
    if (this.item.type == 'artist')
      this.subText = this.item.genres.slice(0, 2).join(' • ');
  }
}
