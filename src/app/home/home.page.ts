import { Component } from '@angular/core';
import { ANIMALES } from '../../data/data.animales';
import { Animal } from '../../interfaces/animal.interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  animales: Animal[] = [];
  audio = new Audio();
  audioTiempo: any;

  constructor() {
    this.animales = ANIMALES.slice(0);
  }

  reproducir(animal: Animal) {
    this.pausar_audio(animal);

    if (animal.reproduciendo) {
      animal.reproduciendo = false;
      return;
    }

    this.audio.src = animal.audio;

    this.audio.load();
    this.audio.play();

    animal.reproduciendo = true;

    this.audioTiempo = setTimeout(
      () => (animal.reproduciendo = false),
      animal.duracion * 1000
    );
  }
  private pausar_audio(animalSeleccionado: Animal) {
    clearTimeout(this.audioTiempo);

    this.audio.pause();
    this.audio.currentTime = 0;

    for (const animal of this.animales) {
      if (animal.nombre != animalSeleccionado.nombre) {
        animal.reproduciendo = false;
      }
    }
  }
}
