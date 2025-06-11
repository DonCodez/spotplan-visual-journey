
export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  type: 'activity' | 'meal' | 'accommodation' | 'free';
  item?: ScheduleItem;
  isEditable: boolean;
  duration?: number; // Duration in minutes
}

export interface ScheduleItem {
  id: string;
  title: string;
  type: 'place' | 'restaurant' | 'hotel';
  rating?: number;
  thumbnail?: string;
  distance?: string;
  priceLevel?: number;
  description?: string;
  duration?: number; // Default duration in minutes
  // Backend Integration: Ready for Google Places API data
  // placeId?: string; // Google Places ID
  // coordinates?: { lat: number; lng: number };
  // address?: string;
  // phoneNumber?: string;
  // website?: string;
  // photos?: string[];
}

export interface Place extends ScheduleItem {
  type: 'place';
  category?: string;
  // Backend Integration: Google Places specific fields
  // businessStatus?: string;
  // openingHours?: string[];
  // reviews?: Review[];
}

export interface Restaurant extends ScheduleItem {
  type: 'restaurant';
  cuisine?: string;
  priceLevel: number;
  // Backend Integration: Google Places specific fields for restaurants
  // servesBreakfast?: boolean;
  // servesLunch?: boolean;
  // servesDinner?: boolean;
  // delivery?: boolean;
  // takeout?: boolean;
}

export interface Hotel extends ScheduleItem {
  type: 'hotel';
  stars: number;
  location: string;
  // Backend Integration: Hotel API specific fields
  // amenities?: string[];
  // roomTypes?: RoomType[];
  // pricePerNight?: number;
  // availability?: boolean;
}

export interface DaySchedule {
  date: string;
  timeSlots: TimeSlot[];
}
