import { Button } from "flowbite-react";
import { Card } from "flowbite-react";
import { Mail } from "lucide-react";
import { getAllTutorsAPI } from "../../api/tutor";
import { useState, useEffect } from "react";
import { Chat } from "../../api/link";
import { Link } from "react-router-dom";
export default function Tutors() {

    const [tutors, setTutors] = useState([]);

    useEffect(() => {
        getAllTutorsAPI().then((response) => {
          console.log(response.data.data, 'datataaa');
          
        setTutors(response.data.data);
      });
    }, []); 

    return (

        <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-6">
          <h1 className="text-4xl font-bold mb-4">Meet our Expert Tutors</h1>
          <p className="text-xl text-muted-foreground">
            Meet our expert Tutors who are passionate about teaching and committed to helping you succeed.
          </p>
        </header>

        <div className="flex justify-center pb-5">
        <Link to={Chat}>
    <Button size="lg" className="bg-green-800 hover:bg-green-600">
      One-to-One Session with Tutors
    </Button>
  </Link>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {tutors.map((tutor, id) => (
            <Card key={id} className="overflow-hidden">
              <img
                src={tutor.thumbnail}
                alt={`Portrait of ${tutor.name}`}
                width={400}
                height={400}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 text-white">
                <h2 className="text-xl font-semibold mb-2">Prof. {tutor.name}</h2>
                <p className="text-sm text-muted-foreground mb-2">{tutor.about}</p>
                <p className="text-sm text-muted-foreground mb-2">Qualification: {tutor.qualification}</p>
                <div className="flex items-center text-sm">
                  <Mail className="w-4 h-4 mr-2" />
                  <a href={`mailto:${tutor.email}`} className="hover:underline">
                    {tutor.email}
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
};
