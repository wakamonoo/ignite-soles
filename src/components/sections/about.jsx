"use client";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
import {
  BsClock,
  BsLightningFill,
  BsThunderbolt,
  BsThunderboltFill,
} from "react-icons/bs";
import { CgLock } from "react-icons/cg";
import { LuMapPin } from "react-icons/lu";
import { TbBurger } from "react-icons/tb";

export default function About() {
  const mapRef = useRef(null);
  const leafletMapRef = useRef(null);

  const locations = [
    {
      name: "ignite soles",
      latitude: 13.3004225,
      longitude: 123.4376357,
    },
  ];

  useEffect(() => {
    let cancelled = false;

    const loadMap = async () => {
      const L = await import("leaflet");

      const markerIcon = L.icon({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });

      if (cancelled || !mapRef.current) return;

      const map = L.map(mapRef.current).setView([13.3004225, 123.4376357], 10);

      leafletMapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);

      locations.forEach((location) => {
        L.marker([location.latitude, location.longitude], {
          icon: markerIcon,
        })
          .addTo(map)
          .bindPopup(`<strong>${location.name}</strong>`);
      });
    };

    loadMap();

    return () => {
      cancelled = true;

      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, []);

  return (
    <div
      id="about"
      className="w-full mt-16 p-2 sm:px-4 md:px-8 lg:px-16 xl:px-32"
    >
      <div className="flex items-center gap-2">
        <BsLightningFill className="text-lg" />
        <h2 className="text-lg uppercase">Why ignite-soles</h2>
      </div>
      <div className="mt-8 flex items-center justify-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 flex items-center justify-center p-2 rounded-full bg-accent">
              <p className="text-2xl font-tall text-normal">01</p>
            </div>

            <div className="flex flex-col">
              <p className="font-tall text-lg uppercase leading-tight">
                Fresh Finds
              </p>
              <p className="text-base text-muted leading-tight">
                Trend pairs. New arrivals. Always something new.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 flex items-center justify-center p-2 rounded-full bg-accent">
              <p className="text-2xl font-tall text-normall">02</p>
            </div>

            <div className="flex flex-col">
              <p className="font-tall text-lg uppercase leading-tight">
                Everyday Rotation
              </p>
              <p className="text-base text-muted leading-tight">
                Because your rotaion deserves an upgrade.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 flex items-center justify-center p-2 rounded-full bg-accent">
              <p className="text-2xl font-tall text-normal">03</p>
            </div>

            <div className="flex flex-col">
              <p className="font-tall text-lg uppercase leading-tight">
                Quality Picks
              </p>
              <p className="text-base text-muted leading-tight">
                Carefully selected. Only the best pairs.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 flex items-center justify-center p-2 rounded-full bg-accent">
              <p className="text-2xl font-tall text-normal">04</p>
            </div>

            <div className="flex flex-col">
              <p className="font-tall text-lg uppercase leading-tight">
                Fair Deals
              </p>
              <p className="text-base text-muted leading-tight">
                No hidden fees. Just solid deals.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 py-8">
        <div className="relative h-84 w-full rounded-2xl overflow-hidden">
          <div ref={mapRef} className="absolute inset-0 z-0" />
          <div className="absolute bottom-0 left-0 right-0 flex bg-neutral rounded-2xl shadow-2xl gap-2 divide-x divide-(--color-accent) p-2">
            <div className="mt-4 w-1/2 px-2">
              <h2 className="text-lg uppercase leading-tight">
                From every step to every stride.
              </h2>
              <p className="text-base text-normal leading-tight">
                Shoes made to move. Style made to stand out.
              </p>
            </div>
            <div className="mt-4 w-1/2 flex flex-col gap-2 px-2">
              <div className="flex items-start gap-2">
                <LuMapPin className="text-2xl text-panel shrink-0" />
                <div>
                  <p className="text-base text-normal uppercase font-bold leading-tight">
                    Location
                  </p>
                  <span className="text-sm text-muted">Libon, Albay</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <BsClock className="text-2xl text-panel shrink-0" />
                <div>
                  <p className="text-base text-normal uppercase font-bold leading-tight">
                    Open Daily
                  </p>
                  <span className="text-sm text-muted">7 Days a Week</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
