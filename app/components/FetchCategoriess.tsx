"use client";
import { useEffect } from "react";

export default function FetchCategories() {
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/fetchCategories"); // Server-side API route
        const data = await res.json();
        console.log("Categories fetched:", data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    }

    fetchCategories();
  }, []);

  return null; // UI me kuch show nahi karega
}
