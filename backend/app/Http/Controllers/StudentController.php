<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    // 🔹 Afficher tous les étudiants
    public function index()
    {
        return Student::all();
    }

    // 🔹 Ajouter un nouvel étudiant
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'date_naissance' => 'required|date',
            'adresse' => 'required|string|max:255',
            'tel' => 'required|string|unique:students,tel',
            'pere' => 'required|string|max:255',
            'mere' => 'required|string|max:255',
        ]);

        $student = Student::create($validated);

        return response()->json($student, 201);
    }

    // 🔹 Afficher un étudiant
    public function show(Student $student)
    {
        return $student;
    }

    // 🔹 Mettre à jour un étudiant
    public function update(Request $request, Student $student)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'prenom' => 'sometimes|required|string|max:255',
            'date_naissance' => 'sometimes|required|date',
            'adresse' => 'sometimes|required|string|max:255',
            'tel' => 'sometimes|required|string|unique:students,tel,' . $student->id,
            'pere' => 'sometimes|required|string|max:255',
            'mere' => 'sometimes|required|string|max:255',
        ]);

        $student->update($validated);

        return response()->json($student);
    }

    // 🔹 Supprimer un étudiant
    public function destroy(Student $student)
    {
        $student->delete();

        return response()->json([
            'message' => 'Étudiant supprimé avec succès'
        ]);
    }
}