import { useState, useEffect } from 'react';
import { LogOut, Plus, CheckCircle2, Circle, Trash2, Edit2, X, User } from 'lucide-react';
import type { Todo, UserProfile } from '../types/todo';

const TodoDashboard = () => {
    // const { user, signOut } = useAuth();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [todos, setTodos] = useState<Todo[]>([]);
    const [showTodoModal, setShowTodoModal] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
    const [todoForm, setTodoForm] = useState({ title: '', description: '' });
    const [profileForm, setProfileForm] = useState({
        name: '',
        email: '',
        phone: '',
        website: '',
        address: '',
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProfile();
        loadTodos();
    }, []);

    const loadProfile = async () => {
        // if (!user) return;

        // try {
        //     const { data, error } = await supabase
        //         .from('user_profiles')
        //         .select('*')
        //         .eq('id', user.id)
        //         .maybeSingle();

        //     if (error) throw error;
        //     if (data) {
        //         setProfile(data);
        //         setProfileForm({
        //             name: data.name || '',
        //             email: data.email || '',
        //             phone: data.phone || '',
        //             website: data.website || '',
        //             address: data.address || '',
        //         });
        //     }
        // } catch (err) {
        //     console.error('Error loading profile:', err);
        // } finally {
        //     setLoading(false);
        // }
    };

    const loadTodos = async () => {
        // if (!user) return;

        // try {
        //     const { data, error } = await supabase
        //         .from('todos')
        //         .select('*')
        //         .eq('user_id', user.id)
        //         .order('created_at', { ascending: false });

        //     if (error) throw error;
        //     setTodos(data || []);
        // } catch (err) {
        //     console.error('Error loading todos:', err);
        // }
    };

    const updateProfile = async () => {
        // if (!user) return;

        // try {
        //     const { error } = await supabase.from('user_profiles').update(profileForm).eq('id', user.id);

        //     if (error) throw error;
        //     setProfile({ ...profile, ...profileForm } as UserProfile);
        //     setShowProfileModal(false);
        // } catch (err) {
        //     console.error('Error updating profile:', err);
        // }
    };

    const createTodo = async () => {
        // if (!todoForm.title.trim() || !user) return;

        // try {
        //     const { data, error } = await supabase
        //         .from('todos')
        //         .insert([
        //             {
        //                 title: todoForm.title,
        //                 description: todoForm.description,
        //                 user_id: user.id,
        //             },
        //         ])
        //         .select()
        //         .single();

        //     if (error) throw error;
        //     if (data) {
        //         setTodos([data, ...todos]);
        //     }
        //     setTodoForm({ title: '', description: '' });
        //     setShowTodoModal(false);
        // } catch (err) {
        //     console.error('Error creating todo:', err);
        // }
    };

    const updateTodo = async () => {
        // if (!editingTodo || !todoForm.title.trim()) return;

        // try {
        //     const { data, error } = await supabase
        //         .from('todos')
        //         .update({ title: todoForm.title, description: todoForm.description })
        //         .eq('id', editingTodo.id)
        //         .select()
        //         .single();

        //     if (error) throw error;
        //     if (data) {
        //         setTodos(todos.map((t) => (t.id === data.id ? data : t)));
        //     }
        //     setEditingTodo(null);
        //     setTodoForm({ title: '', description: '' });
        //     setShowTodoModal(false);
        // } catch (err) {
        //     console.error('Error updating todo:', err);
        // }
    };

    const toggleTodoComplete = async (todo: Todo) => {
        // try {
        //     const { data, error } = await supabase
        //         .from('todos')
        //         .update({ completed: !todo.completed })
        //         .eq('id', todo.id)
        //         .select()
        //         .single();

        //     if (error) throw error;
        //     if (data) {
        //         setTodos(todos.map((t) => (t.id === data.id ? data : t)));
        //     }
        // } catch (err) {
        //     console.error('Error toggling todo:', err);
        // }
    };

    const deleteTodo = async (id: string) => {
        if (!confirm('Are you sure you want to delete this todo?')) return;

        // try {
        //     const { error } = await supabase.from('todos').delete().eq('id', id);
        //     if (error) throw error;
        //     setTodos(todos.filter((t) => t.id !== id));
        // } catch (err) {
        //     console.error('Error deleting todo:', err);
        // }
    };

    const openEditModal = (todo: Todo) => {
        setEditingTodo(todo);
        setTodoForm({ title: todo.title, description: todo.description });
        setShowTodoModal(true);
    };

    const closeModal = () => {
        setShowTodoModal(false);
        setEditingTodo(null);
        setTodoForm({ title: '', description: '' });
    };

    // if (loading) {
    //     return (
    //         <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    //             <div className="text-xl text-gray-600">Loading...</div>
    //         </div>
    //     );
    // }

    const signOut = () => {

    };

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <h1 className="text-2xl font-bold text-gray-900">My Todos</h1>
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setShowProfileModal(true)}
                                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                            >
                                <User className="w-6 h-6" />
                            </button>
                            <button
                                onClick={() => signOut()}
                                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
                            >
                                <LogOut className="w-4 h-4" />
                                <span>Sign Out</span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-gray-900">My Todos</h2>
                        <button
                            onClick={() => setShowTodoModal(true)}
                            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                        >
                            <Plus className="w-5 h-5" />
                            <span>Add Todo</span>
                        </button>
                    </div>

                    {todos.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500 mb-4">No todos yet</p>
                            <button
                                onClick={() => setShowTodoModal(true)}
                                className="text-blue-600 hover:text-blue-700 font-medium"
                            >
                                Create your first todo
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {todos.map((todo) => (
                                <div
                                    key={todo.id}
                                    className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition"
                                >
                                    <button
                                        onClick={() => toggleTodoComplete(todo)}
                                        className="mt-1 text-gray-400 hover:text-blue-600 transition"
                                    >
                                        {todo.completed ? (
                                            <CheckCircle2 className="w-6 h-6 text-green-600" />
                                        ) : (
                                            <Circle className="w-6 h-6" />
                                        )}
                                    </button>

                                    <div className="flex-1">
                                        <h3
                                            className={`text-lg font-medium ${todo.completed ? 'line-through text-gray-400' : 'text-gray-900'
                                                }`}
                                        >
                                            {todo.title}
                                        </h3>
                                        {todo.description && (
                                            <p className="text-sm text-gray-600 mt-1">{todo.description}</p>
                                        )}
                                    </div>

                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => openEditModal(todo)}
                                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => deleteTodo(todo.id)}
                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {showTodoModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-semibold text-gray-900">
                                {editingTodo ? 'Edit Todo' : 'Create New Todo'}
                            </h3>
                            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                                <input
                                    type="text"
                                    value={todoForm.title}
                                    onChange={(e) => setTodoForm({ ...todoForm, title: e.target.value })}
                                    placeholder="Todo title"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                <textarea
                                    value={todoForm.description}
                                    onChange={(e) => setTodoForm({ ...todoForm, description: e.target.value })}
                                    placeholder="Todo description (optional)"
                                    rows={4}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                />
                            </div>
                        </div>

                        <div className="flex space-x-3 mt-6">
                            <button
                                onClick={closeModal}
                                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={editingTodo ? updateTodo : createTodo}
                                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                            >
                                {editingTodo ? 'Update' : 'Create'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showProfileModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-screen overflow-y-auto">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-semibold text-gray-900">My Profile</h3>
                            <button
                                onClick={() => setShowProfileModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    value={profileForm.name}
                                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    value={profileForm.email}
                                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                                <input
                                    type="tel"
                                    value={profileForm.phone}
                                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                                <input
                                    type="url"
                                    value={profileForm.website}
                                    onChange={(e) => setProfileForm({ ...profileForm, website: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                                <input
                                    type="text"
                                    value={profileForm.address}
                                    onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        <div className="flex space-x-3 mt-6">
                            <button
                                onClick={() => setShowProfileModal(false)}
                                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={updateProfile}
                                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TodoDashboard;

