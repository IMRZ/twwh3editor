// @ts-nocheck
import L from 'leaflet';

L.Marker.addInitHook(function() {
  if (this.options.virtual) {
    // setup virtualization after marker was added
    this.on('add', function() {

      this._updateIconVisibility = function() {
        var map = this._map,
          isVisible = map.getBounds().contains(this.getLatLng()),
          wasVisible = this._wasVisible,
          icon = this._icon,
          iconParent = this._iconParent,
          shadow = this._shadow,
          shadowParent = this._shadowParent;

        // remember parent of icon
        if (!iconParent) {
          iconParent = this._iconParent = icon.parentNode;
        }
        if (shadow && !shadowParent) {
          shadowParent = this._shadowParent = shadow.parentNode;
        }

        // add/remove from DOM on change
        if (isVisible != wasVisible) {
          if (isVisible) {
            iconParent.appendChild(icon);
            if (shadow) {
              shadowParent.appendChild(shadow);
            }
          } else {
            iconParent.removeChild(icon);
            if (shadow) {
              shadowParent.removeChild(shadow);
            }
          }

          this._wasVisible = isVisible;

        }
      };

      // on map size change, remove/add icon from/to DOM
      this._map.on('resize moveend zoomend', this._updateIconVisibility, this);
      this._updateIconVisibility();

    }, this);
  }
});
