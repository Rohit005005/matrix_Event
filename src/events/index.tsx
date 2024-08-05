import { CheckCheck } from "lucide-react";
import React, { useState } from "react";

interface Event {
  name: string;
  img: string;
  desc: string;
}

interface TeamMember {
  name: string;
  phone: string;
  email: string;
}

interface HackathonDetails {
  participationType: "solo" | "team";
  team: TeamMember[];
}

const events: Event[] = [
  {
    name: "DSA COMPETITION",
    desc: "Maintain originality and integrity. Understand software/hardware, its algorithms, and design.Complete tasks within specified time limits. Originality and integrity must be maintained.Follow event behavior guidelines.",
    img: "/dsa.jpeg",
  },
  {
    name: "UI/UX COMPETITION",
    desc: "Maintain originality and integrity. Understand software/hardware, its algorithms, and design.Complete tasks within specified time limits. Originality and integrity must be maintained.Follow event behavior guidelines.",
    img: "/dsa.jpeg",
  },
  {
    name: "CSS BATTLE",
    desc: "Maintain originality and integrity. Understand software/hardware, its algorithms, and design.Complete tasks within specified time limits. Originality and integrity must be maintained.Follow event behavior guidelines.",
    img: "/dsa.jpeg",
  },
  {
    name: "CODE REPLAY",
    desc: "Maintain originality and integrity. Understand software/hardware, its algorithms, and design.Complete tasks within specified time limits. Originality and integrity must be maintained.Follow event behavior guidelines.",
    img: "/dsa.jpeg",
  },
  {
    name: "TECH QUIZ",
    desc: "Maintain originality and integrity. Understand software/hardware, its algorithms, and design.Complete tasks within specified time limits. Originality and integrity must be maintained.Follow event behavior guidelines.",
    img: "/dsa.jpeg",
  },
  {
    name: "HACKATHON",
    desc: "Maintain originality and integrity. Understand software/hardware, its algorithms, and design.Complete tasks within specified time limits. Originality and integrity must be maintained.Follow event behavior guidelines.",
    img: "/dsa.jpeg",
  },
];

const Events: React.FC = () => {
  const [selectedEvents, setSelectedEvents] = useState<Event[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [showHackathonForm, setShowHackathonForm] = useState<boolean>(false);
  const [hackathonDetails, setHackathonDetails] = useState<HackathonDetails>({
    participationType: "solo",
    team: [{ name: "", phone: "", email: "" }],
  });
  const [formErrors, setFormErrors] = useState<string[]>([]);

  const handleSelect = (event: Event) => {
    if (event.name === "HACKATHON") {
      if (selectedEvents.includes(event)) {
        setSelectedEvents((prev) => prev.filter((e) => e.name !== "HACKATHON"));
      } else {
        setShowHackathonForm(true);
      }
    } else {
      setSelectedEvents((prev) =>
        prev.includes(event)
          ? prev.filter((e) => e !== event)
          : [...prev, event]
      );
    }
  };

  const handleHackathonFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index?: number
  ) => {
    const { name, value } = e.target;
    if (name === "participationType") {
      setHackathonDetails((prev) => ({
        ...prev,
        participationType: value as "solo" | "team",
        team:
          value === "solo" ? [{ name: "", phone: "", email: "" }] : prev.team,
      }));
    } else if (index !== undefined) {
      const newTeam = [...hackathonDetails.team];
      newTeam[index][name as keyof TeamMember] = value;
      setHackathonDetails((prev) => ({ ...prev, team: newTeam }));
    }
  };

  const handleAddTeamMember = () => {
    setHackathonDetails((prev) => ({
      ...prev,
      team: [...prev.team, { name: "", phone: "", email: "" }],
    }));
  };

  const handleRemoveTeamMember = (index: number) => {
    setHackathonDetails((prev) => ({
      ...prev,
      team: prev.team.filter((_, i) => i !== index),
    }));
  };

  const validateForm = (): boolean => {
    const errors: string[] = [];
    hackathonDetails.team.forEach((member, index) => {
      if (!member.name || !member.phone || !member.email) {
        errors.push(`Please fill out all fields for team member ${index + 1}`);
      }
    });
    setFormErrors(errors);
    return errors.length === 0;
  };

  const handleHackathonSubmit = () => {
    if (validateForm()) {
      const hackathonEvent = events.find((e) => e.name === "HACKATHON");
      if (hackathonEvent) {
        setSelectedEvents((prev) => [...prev, hackathonEvent]);
        setShowHackathonForm(false);
      }
    }
  };

  const calculateTotalPrice = (): number => {
    const count = selectedEvents.filter(
      (event) => event.name !== "HACKATHON"
    ).length;
    if (count === 1) return 50;
    if (count === 2) return 80;
    if (count === 3) return 110;
    if (count === 4) return 150;
    if (count >= 5) return 150;
    return 0;
  };

  return (
    <section className="min-h-screen w-screen bg-black">
      <h1 className="text-[#00ffd4] text-4xl sm:text-8xl font-extrabold text-center py-5 sm:py-10">
        EVENTS
      </h1>
      <div className="flex flex-col gap-20 sm:gap-20 p-4 sm:p-10 ">
        {events.map((event, index) => (
          <div
            key={index}
            className={`text-white flex flex-col sm:flex-row justify-center sm:items-stretch items-center gap-1 sm:gap-5 sm:justify-between rounded-2xl h-full sm:h-[300px] shadow-[0px_0px_0px_1px_#4fd1c5] ${
              selectedEvents.includes(event) ? "bg-cyan-900" : ""
            }`}
          >
            <div className="w-full sm:w-[500px]">
              <img
                className="rounded-t-2xl sm:rounded-l-2xl object-cover w-full h-full"
                src={event.img}
                alt="image"
              />
            </div>
            <div className="w-[90%] sm:w-[600px] flex flex-col justify-center items-center py-5">
              <div className="text-2xl sm:text-4xl font-bold text-center">
                {event.name}
              </div>
              <div className="text-sm sm:text-xl lg:text-2xl text-center mt-3">
                {event.desc}
              </div>
            </div>
            <div
              className="flex flex-col justify-center items-center gap-3 text-black bg-[#00ffd4] w-[300px] py-3 sm:py-0 sm:w-[200px] sm:rounded-r-2xl mb-5 sm:mb-0"
              onClick={() => handleSelect(event)}
            >
              <h1 className="text-xl sm:text-4xl font-extrabold">
                {selectedEvents.includes(event) ? (
                  <CheckCheck className="w-7 h-7 sm:w-10 sm:h-10" />
                ) : (
                  "Select"
                )}
              </h1>
            </div>
          </div>
        ))}
      </div>
      {showHackathonForm && (
        <div className="text-white text-center mt-10">
          <h2 className="text-[#00ffd4] text-4xl sm:text-6xl font-extrabold text-center">
            Hackathon Registration
          </h2>
          <div className="flex flex-col justify-center items-center mt-5">
            <div className="flex flex-col gap-5 mt-4 w-[80%]">
              <label className="text-2xl sm:text-4xl">
                Participation Type:
                <select
                  className="bg-black text-white"
                  name="participationType"
                  required
                  value={hackathonDetails.participationType}
                  onChange={(e) => handleHackathonFormChange(e)}
                >
                  <option value="solo">Solo</option>
                  <option value="team">Team</option>
                </select>
              </label>
              {hackathonDetails.team.map((member, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-5 p-7 sm:p-10 shadow-[0px_0px_0px_1px_#4fd1c5] rounded-2xl"
                >
                  <input
                    className="bg-black text-white text-2xl p-2 shadow-[0px_0px_0px_1px_#4fd1c5] rounded-xl"
                    required
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={member.name}
                    onChange={(e) => handleHackathonFormChange(e, index)}
                  />
                  <input
                    className="bg-black text-white text-2xl p-2 shadow-[0px_0px_0px_1px_#4fd1c5] rounded-xl"
                    required
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={member.phone}
                    onChange={(e) => handleHackathonFormChange(e, index)}
                  />
                  <input
                    className="bg-black text-white text-2xl p-2 shadow-[0px_0px_0px_1px_#4fd1c5] rounded-xl"
                    required
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={member.email}
                    onChange={(e) => handleHackathonFormChange(e, index)}
                  />
                  {hackathonDetails.participationType === "team" &&
                    index > 0 && (
                      <button
                        className="bg-red-700 text-white font-bold text-2xl"
                        onClick={() => handleRemoveTeamMember(index)}
                      >
                        Remove
                      </button>
                    )}
                </div>
              ))}
              {hackathonDetails.participationType === "team" &&
                hackathonDetails.team.length < 4 && (
                  <button
                    className="bg-[#00ffd4] text-black font-bold text-3xl"
                    onClick={handleAddTeamMember}
                  >
                    Add Team Member
                  </button>
                )}
              <button
                className="bg-[#00ffd4] text-black font-bold text-3xl"
                onClick={handleHackathonSubmit}
              >
                Submit
              </button>
              {formErrors.length > 0 && (
                <div className="text-red-500 mt-4">
                  {formErrors.map((error, index) => (
                    <p key={index} className="text-2xl">
                      {error}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="text-white text-center mt-10">
        <h2 className="text-[#00ffd4] text-4xl sm:text-6xl font-extrabold text-center">
          Selected Events:
        </h2>
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="flex flex-col gap-5 mt-4">
            {selectedEvents.map((event, index) => (
              <h2 key={index} className="text-2xl sm:text-4xl">
                {event.name}
              </h2>
            ))}
          </div>
          <h2 className="text-[#00ffd4] text-4xl sm:text-5xl font-extrabold text-center my-10">
            Total Price: ${calculateTotalPrice()}
          </h2>
        </div>
        <button
          onClick={() => {
            console.log(selectedEvents);
            console.log(calculateTotalPrice());
          }}
          className="bg-[#00ffd4] text-3xl sm:text-6xl font-extrabold text-center text-black px-8 rounded-2xl mb-10"
        >
          Proceed
        </button>
      </div>
    </section>
  );
};

export default Events;
