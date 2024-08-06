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

interface EventDetails {
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
    name: "HACKATHON",
    desc: "Maintain originality and integrity. Understand software/hardware, its algorithms, and design.Complete tasks within specified time limits. Originality and integrity must be maintained.Follow event behavior guidelines.",
    img: "/dsa.jpeg",
  },
  {
    name: "INSIDE EDGE",
    desc: "Maintain originality and integrity. Understand software/hardware, its algorithms, and design.Complete tasks within specified time limits. Originality and integrity must be maintained.Follow event behavior guidelines.",
    img: "/dsa.jpeg",
  },
  {
    name: "GAMING TOURNAMENT",
    desc: "Maintain originality and integrity. Understand software/hardware, its algorithms, and design.Complete tasks within specified time limits. Originality and integrity must be maintained.Follow event behavior guidelines.",
    img: "/dsa.jpeg",
  },
  {
    name: "NEWS FLASH",
    desc: "Maintain originality and integrity. Understand software/hardware, its algorithms, and design.Complete tasks within specified time limits. Originality and integrity must be maintained.Follow event behavior guidelines.",
    img: "/dsa.jpeg",
  },
  {
    name: "PITCHERS",
    desc: "Maintain originality and integrity. Understand software/hardware, its algorithms, and design.Complete tasks within specified time limits. Originality and integrity must be maintained.Follow event behavior guidelines.",
    img: "/dsa.jpeg",
  },
  {
    name: "LIVE PROJECTS",
    desc: "Maintain originality and integrity. Understand software/hardware, its algorithms, and design.Complete tasks within specified time limits. Originality and integrity must be maintained.Follow event behavior guidelines.",
    img: "/dsa.jpeg",
  },
];;

const Events: React.FC = () => {
  const [selectedEvents, setSelectedEvents] = useState<Event[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [showLiveProjectsForm, setShowLiveProjectsForm] = useState<boolean>(false);
  const [showGamingTournamentForm, setShowGamingTournamentForm] = useState<boolean>(false);
  const [liveProjectsDetails, setLiveProjectsDetails] = useState<EventDetails>({
    participationType: "solo",
    team: [{ name: "", phone: "", email: "" }],
  });
  const [gamingTournamentDetails, setGamingTournamentDetails] = useState<EventDetails>({
    participationType: "solo",
    team: [{ name: "", phone: "", email: "" }],
  });
  const [formErrors, setFormErrors] = useState<string[]>([]);

  const handleSelect = (event: Event) => {
    if (event.name === "HACKATHON") {
      window.open("https://www.devfolio.com", "_blank");
      setSelectedEvents((prev) => {
        if (!prev.some((e) => e.name === event.name)) {
          return [...prev, event];
        }
        return prev;
      });
    } else if (event.name === "LIVE PROJECTS" || event.name === "GAMING TOURNAMENT") {
      if (selectedEvents.includes(event)) {
        setSelectedEvents((prev) => prev.filter((e) => e.name !== event.name));
      } else {
        if (event.name === "LIVE PROJECTS") setShowLiveProjectsForm(true);
        if (event.name === "GAMING TOURNAMENT") setShowGamingTournamentForm(true);
      }
    } else {
      setSelectedEvents((prev) =>
        prev.includes(event)
          ? prev.filter((e) => e !== event)
          : [...prev, event]
      );
    }
  };
  

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index: number | undefined,
    type: "liveProjects" | "gamingTournament"
  ) => {
    const { name, value } = e.target;
    const setDetails = type === "liveProjects" ? setLiveProjectsDetails : setGamingTournamentDetails;
    const details = type === "liveProjects" ? liveProjectsDetails : gamingTournamentDetails;

    if (name === "participationType") {
      setDetails((prev) => ({
        ...prev,
        participationType: value as "solo" | "team",
        team: value === "solo" ? [{ name: "", phone: "", email: "" }] : prev.team,
      }));
    } else if (index !== undefined) {
      const newTeam = [...details.team];
      newTeam[index][name as keyof TeamMember] = value;
      setDetails((prev) => ({ ...prev, team: newTeam }));
    }
  };

  const handleAddTeamMember = (type: "liveProjects" | "gamingTournament") => {
    const setDetails = type === "liveProjects" ? setLiveProjectsDetails : setGamingTournamentDetails;
    const details = type === "liveProjects" ? liveProjectsDetails : gamingTournamentDetails;

    setDetails((prev) => ({
      ...prev,
      team: [...prev.team, { name: "", phone: "", email: "" }],
    }));
  };

  const handleRemoveTeamMember = (index: number, type: "liveProjects" | "gamingTournament") => {
    const setDetails = type === "liveProjects" ? setLiveProjectsDetails : setGamingTournamentDetails;
    const details = type === "liveProjects" ? liveProjectsDetails : gamingTournamentDetails;

    setDetails((prev) => ({
      ...prev,
      team: prev.team.filter((_, i) => i !== index),
    }));
  };

  const validateForm = (type: "liveProjects" | "gamingTournament"): boolean => {
    const errors: string[] = [];
    const details = type === "liveProjects" ? liveProjectsDetails : gamingTournamentDetails;
    details.team.forEach((member, index) => {
      if (!member.name || !member.phone || !member.email) {
        errors.push(`Please fill out all fields for team member ${index + 1}`);
      }
    });
    setFormErrors(errors);
    return errors.length === 0;
  };

  const handleSubmitForm = (type: "liveProjects" | "gamingTournament") => {
    if (validateForm(type)) {
      const event = events.find((e) => e.name === (type === "liveProjects" ? "LIVE PROJECTS" : "GAMING TOURNAMENT"));
      if (event) {
        setSelectedEvents((prev) => [...prev, event]);
        if (type === "liveProjects") setShowLiveProjectsForm(false);
        if (type === "gamingTournament") setShowGamingTournamentForm(false);
      }
    }
  };

  const calculateTotalPrice = (): number => {
    let total = 0;
    let otherEventsCount = 0;

    selectedEvents.forEach((event) => {
      if (event.name === "GAMING TOURNAMENT") {
        if (gamingTournamentDetails.participationType === "solo") {
          total += 100;
        } else {
          total += gamingTournamentDetails.team.length * 100;
        }
      } else if (event.name !== "HACKATHON" && event.name !== "LIVE PROJECTS") {
        otherEventsCount++;
      }
    });

    if (otherEventsCount === 1) total += 50;
    else if (otherEventsCount === 2) total += 80;
    else if (otherEventsCount === 3) total += 110;
    else if (otherEventsCount >= 4) total += 150;

    return total;
  };

  const handleSubmit = () => {
    const totalPrice = calculateTotalPrice();
    setTotal(totalPrice);
    // Additional logic for form submission can be added here
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
      {showLiveProjectsForm && (
        <div className="text-white text-center mt-10">
          <h2 className="text-[#00ffd4] text-4xl sm:text-6xl font-extrabold text-center">
            Live Projects Registration
          </h2>
          <div className="flex flex-col justify-center items-center mt-5">
            <div className="flex flex-col gap-5 mt-4 w-[80%]">
              <label className="text-2xl sm:text-4xl">
                Participation Type:
                <select
                  className="bg-black text-white"
                  name="participationType"
                  required
                  value={liveProjectsDetails.participationType}
                  onChange={(e) => handleFormChange(e, undefined, "liveProjects")}
                >
                  <option value="solo">Solo</option>
                  <option value="team">Team</option>
                </select>
              </label>
              {liveProjectsDetails.team.map((member, index) => (
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
                    onChange={(e) => handleFormChange(e, index, "liveProjects")}
                  />
                  <input
                    className="bg-black text-white text-2xl p-2 shadow-[0px_0px_0px_1px_#4fd1c5] rounded-xl"
                    required
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={member.phone}
                    onChange={(e) => handleFormChange(e, index, "liveProjects")}
                  />
                  <input
                    className="bg-black text-white text-2xl p-2 shadow-[0px_0px_0px_1px_#4fd1c5] rounded-xl"
                    required
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={member.email}
                    onChange={(e) => handleFormChange(e, index, "liveProjects")}
                  />
                  {liveProjectsDetails.participationType === "team" &&
                    index > 0 && (
                      <button
                        className="bg-red-700 text-white font-bold text-2xl"
                        onClick={() => handleRemoveTeamMember(index, "liveProjects")}
                      >
                        Remove
                      </button>
                    )}
                </div>
              ))}
              {liveProjectsDetails.participationType === "team" &&
                liveProjectsDetails.team.length < 4 && (
                  <button
                    className="bg-[#00ffd4] text-black font-bold text-3xl"
                    onClick={() => handleAddTeamMember("liveProjects")}
                  >
                    Add Team Member
                  </button>
                )}
              <button
                className="bg-[#00ffd4] text-black font-bold text-3xl"
                onClick={() => handleSubmitForm("liveProjects")}
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
      {showGamingTournamentForm && (
        <div className="text-white text-center mt-10">
          <h2 className="text-[#00ffd4] text-4xl sm:text-6xl font-extrabold text-center">
            Gaming Tournament Registration
          </h2>
          <div className="flex flex-col justify-center items-center mt-5">
            <div className="flex flex-col gap-5 mt-4 w-[80%]">
              <label className="text-2xl sm:text-4xl">
                Participation Type:
                <select
                  className="bg-black text-white"
                  name="participationType"
                  required
                  value={gamingTournamentDetails.participationType}
                  onChange={(e) => handleFormChange(e, undefined, "gamingTournament")}
                >
                  <option value="solo">Solo</option>
                  <option value="team">Team</option>
                </select>
              </label>
              {gamingTournamentDetails.team.map((member, index) => (
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
                    onChange={(e) => handleFormChange(e, index, "gamingTournament")}
                  />
                  <input
                    className="bg-black text-white text-2xl p-2 shadow-[0px_0px_0px_1px_#4fd1c5] rounded-xl"
                    required
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={member.phone}
                    onChange={(e) => handleFormChange(e, index, "gamingTournament")}
                  />
                  <input
                    className="bg-black text-white text-2xl p-2 shadow-[0px_0px_0px_1px_#4fd1c5] rounded-xl"
                    required
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={member.email}
                    onChange={(e) => handleFormChange(e, index, "gamingTournament")}
                  />
                  {gamingTournamentDetails.participationType === "team" &&
                    index > 0 && (
                      <button
                        className="bg-red-700 text-white font-bold text-2xl"
                        onClick={() => handleRemoveTeamMember(index, "gamingTournament")}
                      >
                        Remove
                      </button>
                    )}
                </div>
              ))}
              {gamingTournamentDetails.participationType === "team" &&
                gamingTournamentDetails.team.length < 4 && (
                  <button
                    className="bg-[#00ffd4] text-black font-bold text-3xl"
                    onClick={() => handleAddTeamMember("gamingTournament")}
                  >
                    Add Team Member
                  </button>
                )}
              <button
                className="bg-[#00ffd4] text-black font-bold text-3xl"
                onClick={() => handleSubmitForm("gamingTournament")}
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
