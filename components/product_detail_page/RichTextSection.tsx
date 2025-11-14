import React, { useState, useEffect, useRef } from 'react';

interface RichTextSectionProps {
  onDesktopChange?: (content: string) => void;
  onMobileChange?: (content: string) => void;
  initialDesktopContent?: string | null;
  initialMobileContent?: string | null;
  previewOnly?: boolean;
}

const snippets: { [key: string]: { name: string; html: string } } = {
  h1: { name: 'H1', html: '<h1 class="text-4xl font-bold mb-4">Título Principal</h1>' },
  h2: { name: 'H2', html: '<h2 class="text-3xl font-bold mb-3">Título de Sección</h2>' },
  h3: { name: 'H3', html: '<h3 class="text-2xl font-bold mb-2">Subtítulo</h3>' },
  p: { name: 'Párrafo', html: '<p class="mb-4 text-gray-700">Este es un párrafo de ejemplo. Puedes reemplazar este texto con tu propio contenido para describir las características y beneficios de tu producto de manera detallada y atractiva para tus clientes.</p>' },
  quote: { name: 'Cita', html: '<blockquote class="border-l-4 border-gray-300 pl-4 py-2 my-4 italic text-gray-600">\n  "Esta es una cita destacada para llamar la atención."\n</blockquote>' },
  cols2: { name: '2 Columnas', html: '<div class="grid md:grid-cols-2 gap-6 my-4">\n  <div class="p-4 bg-gray-50 rounded-lg">Columna 1</div>\n  <div class="p-4 bg-gray-50 rounded-lg">Columna 2</div>\n</div>' },
  cols3: { name: '3 Columnas', html: '<div class="grid md:grid-cols-3 gap-6 my-4">\n  <div class="p-4 bg-gray-50 rounded-lg">Columna 1</div>\n  <div class="p-4 bg-gray-50 rounded-lg">Columna 2</div>\n  <div class="p-4 bg-gray-50 rounded-lg">Columna 3</div>\n</div>' },
  divider: { name: 'Divisor', html: '<hr class="my-8" />' },
  button: { name: 'Botón', html: '<a href="#" class="inline-block bg-[#e52e8d] text-white font-bold py-3 px-8 rounded-full hover:bg-[#c82278] transition-colors my-4">Botón de Ejemplo</a>' },
  image: { name: 'Imagen', html: '<img src="https://picsum.photos/seed/ketoshop/800/400" alt="Placeholder" class="w-full h-auto rounded-lg my-4" />' },
  video: { name: 'Video', html: '<div class="aspect-w-16 aspect-h-9 my-4">\n  <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="w-full h-full rounded-lg shadow-lg"></iframe>\n</div>' },
};

const ToolbarButton: React.FC<{ name: string; onClick: () => void }> = ({ name, onClick }) => (
    <button type="button" onClick={onClick} title={name} className="px-3 py-2 text-xs font-semibold text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">
        {name}
    </button>
);

const Editor: React.FC<{ content: string; onChange: (newContent: string) => void; }> = ({ content, onChange }) => {
    const [view, setView] = useState<'visual' | 'html'>('visual');
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const visualEditorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Sync the contentEditable div when the content prop changes
        if (view === 'visual' && visualEditorRef.current && visualEditorRef.current.innerHTML !== content) {
            visualEditorRef.current.innerHTML = content;
        }
    }, [content, view]);


    const handleInsertSnippet = (html: string) => {
        const textarea = textareaRef.current;
        if (!textarea) return;
        
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const newContent = content.substring(0, start) + html + content.substring(end);
        
        onChange(newContent);

        // Focus and set cursor position after insertion
        setTimeout(() => {
            textarea.focus();
            textarea.selectionStart = textarea.selectionEnd = start + html.length;
        }, 0);
    };

    return (
        <div className="border rounded-lg">
            <div className="p-2 border-b bg-gray-50 flex flex-wrap items-center gap-2">
                <div className="flex flex-wrap gap-2">
                    {Object.values(snippets).map(snippet => (
                        <ToolbarButton key={snippet.name} name={snippet.name} onClick={() => handleInsertSnippet(snippet.html)} />
                    ))}
                </div>
                <div className="ml-auto flex gap-2">
                    <button type="button" onClick={() => setView('visual')} className={`px-3 py-1.5 text-xs font-bold rounded-md ${view === 'visual' ? 'bg-pink-600 text-white' : 'bg-gray-200 text-gray-800'}`}>Visual</button>
                    <button type="button" onClick={() => setView('html')} className={`px-3 py-1.5 text-xs font-bold rounded-md ${view === 'html' ? 'bg-pink-600 text-white' : 'bg-gray-200 text-gray-800'}`}>HTML</button>
                </div>
            </div>
            {view === 'visual' ? (
                <div
                    ref={visualEditorRef}
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => onChange(e.currentTarget.innerHTML)}
                    className="p-4 min-h-[300px] prose max-w-none focus:outline-none focus:ring-2 focus:ring-pink-500 rounded-b-lg"
                />
            ) : (
                <textarea
                    ref={textareaRef}
                    value={content}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full min-h-[300px] p-4 font-mono text-sm bg-[#1e1e1e] text-green-300 rounded-b-lg focus:outline-none"
                    spellCheck="false"
                />
            )}
        </div>
    );
};

const RichTextSection: React.FC<RichTextSectionProps> = ({
  initialDesktopContent,
  initialMobileContent,
  onDesktopChange,
  onMobileChange,
  previewOnly = false,
}) => {
    const [activeEditor, setActiveEditor] = useState<'desktop' | 'mobile'>('desktop');
    const [desktopContent, setDesktopContent] = useState(initialDesktopContent || '');
    const [mobileContent, setMobileContent] = useState(initialMobileContent || '');

    useEffect(() => {
        setDesktopContent(initialDesktopContent || '');
    }, [initialDesktopContent]);

    useEffect(() => {
        setMobileContent(initialMobileContent || '');
    }, [initialMobileContent]);

    const handleDesktopContentChange = (content: string) => {
        setDesktopContent(content);
        if (onDesktopChange) onDesktopChange(content);
    };

    const handleMobileContentChange = (content: string) => {
        setMobileContent(content);
        if (onMobileChange) onMobileChange(content);
    };

    if (previewOnly) {
        return (
            <>
                {/* Desktop: Show only desktop content. Never fall back to mobile. */}
                <div className="hidden md:block prose max-w-none" dangerouslySetInnerHTML={{ __html: desktopContent || '' }} />
                {/* Mobile: Show mobile content, but fall back to desktop if mobile is not provided. */}
                <div className="block md:hidden prose max-w-none" dangerouslySetInnerHTML={{ __html: mobileContent || desktopContent || '' }} />
            </>
        );
    }

    return (
        <div className="space-y-6">
            <div className="border-b">
                <nav className="-mb-px flex space-x-4">
                    <button type="button" onClick={() => setActiveEditor('desktop')} className={`py-3 px-4 font-medium text-sm rounded-t-lg ${activeEditor === 'desktop' ? 'bg-gray-100 border-x border-t' : 'text-gray-500 hover:text-gray-700'}`}>
                        Editor Desktop
                    </button>
                    <button type="button" onClick={() => setActiveEditor('mobile')} className={`py-3 px-4 font-medium text-sm rounded-t-lg ${activeEditor === 'mobile' ? 'bg-gray-100 border-x border-t' : 'text-gray-500 hover:text-gray-700'}`}>
                        Editor Móvil
                    </button>
                </nav>
            </div>
            <div className={activeEditor === 'desktop' ? 'block' : 'hidden'}>
                <h3 className="text-lg font-semibold mb-2">Contenido para Escritorio</h3>
                <Editor content={desktopContent} onChange={handleDesktopContentChange} />
            </div>
            <div className={activeEditor === 'mobile' ? 'block' : 'hidden'}>
                <h3 className="text-lg font-semibold mb-2">Contenido para Móvil</h3>
                <p className="text-sm text-gray-500 mb-2">Si se deja vacío, se usará el contenido de escritorio.</p>
                <Editor content={mobileContent} onChange={handleMobileContentChange} />
            </div>
        </div>
    );
};

export default RichTextSection;