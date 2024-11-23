import React, { useState } from "react";
import dayjs from "dayjs";

interface Note {
    date: string;
    title: string;
}

const Calendar: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(dayjs());
    const [selectedDate, setSelectedDate] = useState(
        dayjs().format("YYYY-MM-DD")
    );
    const [notes, setNotes] = useState<Note[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newNote, setNewNote] = useState("");

    const daysInMonth = currentDate.daysInMonth();
    const firstDayOfMonth = currentDate.startOf("month").day();

    const addNote = () => {
        if (newNote.trim() === "") return;

        const notesForDate = notes.filter((note) => note.date === selectedDate);
        if (notesForDate.length >= 3) {
            alert("You can only add up to 3 events for a single day.");
            return;
        }

        setNotes([...notes, { date: selectedDate, title: newNote }]);
        setNewNote("");
        setIsModalOpen(false);
    };

    const getNotesForDate = (date: string) => {
        return notes.filter((note) => note.date === date);
    };

    return (
        <div className="p-4 w-full container mx-auto">
            <div className="flex justify-between items-center mb-2">
                <h1 className="text-xl font-bold">
                    {currentDate.format("MMMM YYYY")}
                </h1>
                <div className="flex gap-2">
                    <button
                        className="px-2 py-1 border rounded hover:bg-gray-200"
                        onClick={() =>
                            setCurrentDate(currentDate.subtract(1, "month"))
                        }
                    >
                        {"<"}
                    </button>
                    <button
                        className="px-2 py-1 border rounded hover:bg-gray-200"
                        onClick={() =>
                            setCurrentDate(currentDate.add(1, "month"))
                        }
                    >
                        {">"}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-7 gap-3 border-t">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    (day) => (
                        <div
                            key={day}
                            className="text-center py-1 font-semibold"
                        >
                            {day}
                        </div>
                    )
                )}
                {Array(firstDayOfMonth)
                    .fill(null)
                    .map((_, index) => (
                        <div key={index}></div>
                    ))}
                {Array.from({ length: daysInMonth }, (_, index) => {
                    const date = currentDate
                        .date(index + 1)
                        .format("YYYY-MM-DD");
                    return (
                        <div
                            key={index}
                            className={`p-4 border hover:bg-gray-100 rounded cursor-pointer ${
                                selectedDate === date
                                    ? "border-blue-500"
                                    : "border-gray-200"
                            }`}
                            onClick={() => setSelectedDate(date)}
                        >
                            <div className="text-center">{index + 1}</div>
                            <div className="mt-2">
                                {getNotesForDate(date).map((note, i) => (
                                    <div
                                        key={i}
                                        className="text-sm bg-gray-200 rounded px-1 mt-1 truncate"
                                    >
                                        {note.title}
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            <button
                className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
                onClick={() => setIsModalOpen(true)}
            >
                Add Event
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                        <h2 className="text-lg font-bold mb-2">
                            Add New Event
                        </h2>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col">
                                <label className="text-sm font-semibold mb-1">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    placeholder="Event Title"
                                    className="w-full border rounded px-2 py-1"
                                    value={newNote}
                                    onChange={(e) => setNewNote(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm font-semibold mb-1">
                                    Date
                                </label>
                                <input
                                    type="text"
                                    readOnly
                                    value={dayjs(selectedDate).format(
                                        "DD.MM.YYYY"
                                    )}
                                    className="w-full border rounded px-2 py-1 bg-gray-100"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-4 mt-6">
                            <button
                                className="px-4 py-2 border rounded hover:bg-gray-100"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
                                onClick={addNote}
                            >
                                Add Event
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Calendar;
