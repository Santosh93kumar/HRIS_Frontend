import React from 'react';
import Header from '../Header';

const OrgCard = ({ name, role, department }) => (
  <div className="bg-sky-400 text-white p-3 md:p-4 lg:p-5 rounded-lg w-32 md:w-40 lg:w-48 min-h-[120px] text-center shadow-md hover:bg-sky-500 transition-colors">
    <div className="font-medium text-xs md:text-sm break-words">{name}</div>
    <div className="text-xs mt-1">{role}</div>
    <div className="text-xs mt-1">{department}</div>
  </div>
);

const OrganisationStructure = () => {
  const managers = [
    { name: "Niadeem ur Rahman", dept: "Human Resource" },
    { name: "Danish ur Khan", dept: "Sales" },
    { name: "Sakshi Kadam", dept: "Information Technology" },
    { name: "Pratiksha Ade", dept: "Finance" }
  ];

  const officers = [
    { name: "Hussanie Khan", dept: "Human Resource", manager: 0 },
    { name: "Saira Khan", dept: "Human Resource", manager: 0 },
    { name: "Pratik Uttan", dept: "Sales", manager: 1 },
    { name: "Ahead Zamne", dept: "Sales", manager: 1 },
    { name: "Varun Ade", dept: "Sales", manager: 1 },
    { name: "Ibad ur Rahman", dept: "Information Technology", manager: 2 },
    { name: "New IT User", dept: "Information Technology", manager: 2 },
    { name: "Amit Jadhav", dept: "Information Technology", manager: 2 },
    { name: "Fida", dept: "Finance", manager: 3 },
    { name: "Niadeem ur Rahman", dept: "Finance", manager: 3 }
  ];

  return (
    <section className="bg-sky-100 flex flex-col w-full min-h-screen">
      <Header />
      <div className="flex-1 p-4 md:p-6 overflow-x-auto">
        <div className="min-w-[1000px] md:min-w-0"> 
          <h1 className="text-xl md:text-2xl font-semibold mb-6">Organization Structure</h1>
          <div className="w-full flex flex-col items-center">
            {/* CEO Level */}
            <div className="relative flex flex-col items-center mb-12">
              <OrgCard name="Sharma" role="(COD)" department="Management" />
              <div className="h-12 w-px bg-gray-300"></div>
            </div>

            {/* Managers Level */}
            <div className="relative flex justify-center gap-6 md:gap-8 lg:gap-12 mb-12">
              <div className="absolute top-[-48px] h-px bg-gray-300 w-full max-w-3xl"></div>
              {managers.map((manager, idx) => (
                <div key={idx} className="relative flex flex-col items-center">
                  <div className="h-12 w-px absolute top-[-48px] bg-gray-300"></div>
                  <OrgCard name={manager.name} role="(Manager)" department={manager.dept} />
                  <div className="h-12 w-px bg-gray-300"></div>
                </div>
              ))}
            </div>

            {/* Officers Level */}
            <div className="relative flex flex-col md:flex-row justify-center gap-4 md:gap-4 lg:gap-8">
              {managers.map((manager, idx) => {
                const departmentOfficers = officers.filter(o => o.manager === idx);
                return (
                  <div key={idx} className="relative flex flex-col items-center">
                    <div className="absolute top-[-48px] h-px bg-gray-300 w-2xs"></div>
                    <div className="flex gap-4 flex-wrap justify-center max-w-2xs">
                      {departmentOfficers.map((officer, officerIdx) => (
                        <div key={officerIdx} className="relative flex flex-col items-center">
                          <div className="h-12 w-px absolute top-[-48px] bg-gray-300"></div>
                          <OrgCard name={officer.name} role="(Officer)" department={officer.dept} />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrganisationStructure;