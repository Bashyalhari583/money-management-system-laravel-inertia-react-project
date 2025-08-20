<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\RelationService;


class RelationController extends Controller
{
    public function __construct(private RelationService $srv) {}

    public function index(Request $request)
    {
        $list = $this->srv->list($request->user()->id);
        return Inertia::render('Relations/Index', ['relations'=>$list]);
    }

    public function search(Request $request)
    {
        $q = $request->query('q','');
        return response()->json($this->srv->search($q, $request->user()->id));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'relative_id' => 'required|exists:users,id',
            'relation_type' => 'required|in:brother,sister,mother,father,spouse,other'
        ]);
        $rel = $this->srv->send($request->user()->id, $data['relative_id'], $data['relation_type']);
        return back()->with('success','Request sent');
    }

    public function respond(Request $request, int $id)
    {
        $request->validate(['status'=>'required|in:accepted,rejected']);
        $this->srv->respond($id, $request->status);
        return back()->with('success','Updated');
    }
}
