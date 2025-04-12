
import { useState, useRef, useCallback } from "react";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle 
} from "@/components/ui/dialog";
import { Camera, X, Check } from "lucide-react";
import Cropper from "react-easy-crop";

// Import types directly from react-easy-crop instead of /types
type Point = { x: number; y: number };
type Area = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type ProfilePhotoUploaderProps = {
  onPhotoChange: (photoUrl: string) => void;
  currentPhoto?: string | null;
};

export function ProfilePhotoUploader({ onPhotoChange, currentPhoto }: ProfilePhotoUploaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.addEventListener('load', () => {
        if (typeof reader.result === 'string') {
          setPhotoUrl(reader.result);
          setIsOpen(true);
        }
      });
      
      reader.readAsDataURL(file);
    }
  };
  
  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);
  
  const createCroppedImage = async () => {
    if (!photoUrl || !croppedAreaPixels) return;
    
    try {
      const image = new Image();
      image.src = photoUrl;
      
      await new Promise<void>((resolve) => {
        image.onload = () => resolve();
      });
      
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) return;
      
      // Set canvas size to the cropped size
      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;
      
      // Draw the cropped image
      ctx.drawImage(
        image,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
      );
      
      // Convert canvas to base64 and save
      const croppedImageUrl = canvas.toDataURL('image/jpeg');
      onPhotoChange(croppedImageUrl);
      
      // Save to localStorage for persistence
      localStorage.setItem('userProfilePhoto', croppedImageUrl);
      
      setIsOpen(false);
      
      toast({
        title: "Profile Photo Updated",
        description: "Your new profile photo has been saved",
      });
    } catch (error) {
      console.error("Error creating cropped image:", error);
      toast({
        title: "Error",
        description: "Failed to crop image",
        variant: "destructive",
      });
    }
  };
  
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  
  return (
    <>
      <div 
        className="relative group cursor-pointer"
        onClick={triggerFileInput}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
        {currentPhoto ? (
          <div className="relative">
            <img 
              src={currentPhoto} 
              alt="Profile" 
              className="h-full w-full object-cover rounded-full"
            />
            <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Camera className="h-5 w-5 text-white" />
            </div>
          </div>
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-muted rounded-full group-hover:bg-muted/80 transition-all">
            <Camera className="h-5 w-5 text-muted-foreground" />
          </div>
        )}
      </div>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-[350px] sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Crop Profile Photo</DialogTitle>
          </DialogHeader>
          
          <div className="w-full h-[300px] relative my-4">
            {photoUrl && (
              <Cropper
                image={photoUrl}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                cropShape="round"
                showGrid={false}
              />
            )}
          </div>
          
          <div className="flex items-center justify-center space-x-2">
            <input
              type="range"
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          
          <DialogFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button onClick={createCroppedImage}>
              <Check className="mr-2 h-4 w-4" />
              Apply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
