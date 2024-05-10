import './style.css'
import Alpine from 'alpinejs';
import {Deck} from '@deck.gl/core';
import {TileLayer, Tile3DLayer} from '@deck.gl/geo-layers';
import {BitmapLayer} from '@deck.gl/layers';

document.querySelector('#app').innerHTML = `
  <div>
    <canvas id="map" class="w-full h-screen"></canvas>
  </div>
`

window.Alpine = Alpine;
Alpine.data('app', () => ({
  count: 0,
  map: null,
  async init() {
    const apiKey = import.meta.env.VITE_MAPTILER_API_KEY;
    // https://cloud.maptiler.com/maps/jp-mierune-gray/
    const tiles = `https://api.maptiler.com/maps/jp-mierune-gray/256/{z}/{x}/{y}.png?key=${apiKey}`;
    const layer = new TileLayer({
      id: 'TileLayer',
      data: tiles,
      maxZoom: 19,
      minZoom: 0,
      renderSubLayers: props => {
        const {boundingBox} = props.tile;
        return new BitmapLayer(props, {
          data: null,
          image: props.data,
          bounds: [boundingBox[0][0], boundingBox[0][1], boundingBox[1][0], boundingBox[1][1]]
        });
      },
      pickable: true
    });
    const tile3d = new Tile3DLayer({
      id: 'plateau123',
      data: "/minato-ku/lod1/tileset.json",
    });
    const deck = new Deck({
      canvas: 'map',
      initialViewState: {
        longitude: 139.761,
        latitude: 35.665,
        zoom: 15,
        pitch: 60,
        bearing: 0,
      },
      controller: true,
      getTooltip: ({tile}) => tile && `x:${tile.index.x}, y:${tile.index.y}, z:${tile.index.z}`,
      layers: [layer, tile3d]
    });
  },
}));

Alpine.start();
