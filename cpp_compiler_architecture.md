# C++ Compiler Architecture in Rust
## Comprehensive Design Document

---

## Table of Contents
1. [Executive Summary](#executive-summary)
2. [High-Level System Architecture](#high-level-system-architecture)
3. [Module Breakdown](#module-breakdown)
4. [Compilation Pipeline](#compilation-pipeline)
5. [Key Data Structures](#key-data-structures)
6. [Recommended Rust Crates](#recommended-rust-crates)
7. [Implementation Challenges](#implementation-challenges)
8. [Design Decisions and Tradeoffs](#design-decisions-and-tradeoffs)

---

## Executive Summary

This document outlines the architecture for a C++ compiler implemented in Rust. The design emphasizes modularity, type safety, and maintainability while addressing the unique challenges of implementing C++'s complex feature set. The compiler targets a subset of C++ (C++17 standard) with a focus on core features while maintaining extensibility for future enhancements.

**Target Features:**
- Core language features (variables, functions, control flow)
- Object-oriented programming (classes, inheritance, polymorphism)
- Templates (basic template functions and classes)
- Standard library subset
- Modern C++ features (auto, range-based for, lambdas)

**Output Targets:**
- LLVM IR (primary target)
- x86-64 assembly (optional direct codegen path)

---

## High-Level System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     C++ Source Code                          │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Frontend Pipeline                         │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────┐   ┌──────────┐   ┌────────────┐              │
│  │  Lexer   │──▶│  Parser  │──▶│ AST Builder│              │
│  └──────────┘   └──────────┘   └────────────┘              │
│                                       │                      │
│                                       ▼                      │
│                            ┌──────────────────┐             │
│                            │ Semantic Analyzer│             │
│                            └──────────────────┘             │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   Middle-End Pipeline                        │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐   ┌──────────────┐   ┌────────────────┐  │
│  │ Template    │──▶│ Type         │──▶│ Optimization   │  │
│  │ Instantiator│   │ Elaboration  │   │ Passes         │  │
│  └─────────────┘   └──────────────┘   └────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Backend Pipeline                          │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐   │
│  │ IR Generator │──▶│ LLVM Backend │──▶│ Linker       │   │
│  │ (HIR → LLVM) │   │ Optimization │   │ Integration  │   │
│  └──────────────┘   └──────────────┘   └──────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      Executable Binary                       │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    Supporting Systems                        │
├─────────────────────────────────────────────────────────────┤
│  • Symbol Table Management                                   │
│  • Error Reporting & Diagnostics                            │
│  • Source Location Tracking                                  │
│  • Memory Management (Arena Allocation)                      │
│  • Incremental Compilation Cache                            │
└─────────────────────────────────────────────────────────────┘
```

---

## Module Breakdown

### 1. **Lexer Module** (`crate::lexer`)
**Responsibility:** Convert source text into tokens

**Key Components:**
- `Token` enum representing all C++ token types
- `Lexer` struct with stateful scanning
- Preprocessor integration (macro expansion, includes)
- String literal and character escape handling
- Raw string literal support (`R"(...))"`)

**Interface:**
```rust
pub struct Lexer<'source> {
    source: &'source str,
    position: usize,
    // Preprocessor state
}

pub enum Token {
    // Keywords
    Keyword(Keyword),
    // Identifiers
    Identifier(String),
    // Literals
    IntLiteral(i64),
    FloatLiteral(f64),
    StringLiteral(String),
    CharLiteral(char),
    // Operators and punctuation
    Operator(Operator),
    Punctuation(Punctuation),
    // Special
    Eof,
}

impl<'source> Iterator for Lexer<'source> {
    type Item = Result<Spanned<Token>, LexError>;
}
```

---

### 2. **Parser Module** (`crate::parser`)
**Responsibility:** Build a concrete syntax tree (CST) or directly construct AST

**Key Components:**
- Recursive descent parser with operator precedence
- Error recovery strategies
- Ambiguity resolution (most vexing parse, template angle brackets)
- Lookahead management

**Design Choice:** Use a handwritten recursive descent parser rather than a parser generator for better error messages and flexibility with C++'s complex grammar.

**Interface:**
```rust
pub struct Parser<'a> {
    lexer: Peekable<Lexer<'a>>,
    current: Option<Spanned<Token>>,
}

impl<'a> Parser<'a> {
    pub fn parse_translation_unit(&mut self) -> Result<TranslationUnit, ParseError>;
    
    // Declaration parsing
    fn parse_declaration(&mut self) -> Result<Declaration, ParseError>;
    fn parse_function(&mut self) -> Result<Function, ParseError>;
    fn parse_class(&mut self) -> Result<ClassDecl, ParseError>;
    
    // Expression parsing (Pratt parsing for operators)
    fn parse_expression(&mut self, min_bp: u8) -> Result<Expr, ParseError>;
    
    // Statement parsing
    fn parse_statement(&mut self) -> Result<Stmt, ParseError>;
}
```

---

### 3. **AST Module** (`crate::ast`)
**Responsibility:** Define all AST node types

**Key Components:**
- Immutable AST nodes using `Rc` or arena allocation
- Source span tracking on every node
- Visitor pattern support for traversal

**Data Structures:**
```rust
pub struct TranslationUnit {
    pub declarations: Vec<Declaration>,
}

pub enum Declaration {
    Function(Function),
    Class(ClassDecl),
    Variable(VariableDecl),
    Namespace(NamespaceDecl),
    Template(TemplateDecl),
    Using(UsingDecl),
}

pub struct Function {
    pub span: Span,
    pub name: Identifier,
    pub return_type: Type,
    pub params: Vec<Parameter>,
    pub body: Option<Block>,
    pub attributes: Vec<Attribute>,
    pub is_const: bool,
    pub is_virtual: bool,
    pub is_override: bool,
}

pub struct ClassDecl {
    pub span: Span,
    pub name: Identifier,
    pub base_classes: Vec<BaseClass>,
    pub members: Vec<ClassMember>,
    pub template_params: Option<Vec<TemplateParam>>,
}

pub enum Expr {
    Literal(Literal),
    Variable(Identifier),
    BinaryOp { op: BinOp, lhs: Box<Expr>, rhs: Box<Expr> },
    UnaryOp { op: UnOp, operand: Box<Expr> },
    FunctionCall { func: Box<Expr>, args: Vec<Expr> },
    MemberAccess { object: Box<Expr>, member: Identifier },
    ArraySubscript { array: Box<Expr>, index: Box<Expr> },
    Cast { target_type: Type, expr: Box<Expr> },
    Lambda { captures: Vec<Capture>, params: Vec<Parameter>, body: Block },
    // ... more variants
}

pub enum Stmt {
    Expression(Expr),
    Return(Option<Expr>),
    If { condition: Expr, then_branch: Box<Stmt>, else_branch: Option<Box<Stmt>> },
    While { condition: Expr, body: Box<Stmt> },
    For { init: Option<Box<Stmt>>, condition: Option<Expr>, increment: Option<Expr>, body: Box<Stmt> },
    Block(Block),
    Declaration(Declaration),
    // ... more variants
}
```

---

### 4. **Semantic Analysis Module** (`crate::sema`)
**Responsibility:** Type checking, name resolution, semantic validation

**Key Components:**
- Symbol table management
- Name resolution (qualified names, ADL)
- Type checking and inference
- Overload resolution
- Template argument deduction
- Implicit conversion handling

**Submodules:**
- `sema::resolve` - Name resolution
- `sema::typecheck` - Type checking
- `sema::overload` - Overload resolution
- `sema::inference` - Type inference (auto, template deduction)

**Interface:**
```rust
pub struct SemanticAnalyzer {
    symbol_table: SymbolTable,
    type_registry: TypeRegistry,
    diagnostics: DiagnosticEngine,
}

impl SemanticAnalyzer {
    pub fn analyze(&mut self, ast: &TranslationUnit) -> Result<AnalyzedAST, SemanticError>;
    
    fn resolve_names(&mut self, node: &Declaration) -> Result<(), SemanticError>;
    fn check_types(&mut self, expr: &Expr) -> Result<TypeId, TypeError>;
    fn resolve_overload(&mut self, candidates: &[FunctionId], args: &[TypeId]) -> Result<FunctionId, OverloadError>;
}

pub struct AnalyzedAST {
    pub ast: TranslationUnit,
    pub type_annotations: HashMap<NodeId, TypeId>,
    pub resolved_symbols: HashMap<NodeId, SymbolId>,
}
```

---

### 5. **Type System Module** (`crate::types`)
**Responsibility:** Represent and manipulate C++ types

**Key Components:**
- Type representations (fundamental, compound, user-defined)
- Type relationships (subtyping, conversions)
- Template type handling
- Const/volatile qualifiers

**Data Structures:**
```rust
#[derive(Debug, Clone, PartialEq, Eq, Hash)]
pub enum Type {
    // Fundamental types
    Void,
    Bool,
    Char,
    Int,
    Float,
    Double,
    
    // Compound types
    Pointer(Box<Type>),
    Reference(Box<Type>),
    RValueReference(Box<Type>),
    Array { element_type: Box<Type>, size: Option<u64> },
    
    // User-defined types
    Class(ClassId),
    Enum(EnumId),
    
    // Function types
    Function { return_type: Box<Type>, param_types: Vec<Type> },
    
    // Template types
    TemplateParam(TemplateParamId),
    TemplateInstantiation { template: TemplateId, args: Vec<Type> },
    
    // Qualifiers
    Const(Box<Type>),
    Volatile(Box<Type>),
    
    // Special
    Auto, // Before type inference
    Unknown, // Error recovery
}

pub struct TypeRegistry {
    types: HashMap<TypeId, Type>,
    next_id: TypeId,
}

impl TypeRegistry {
    pub fn register(&mut self, ty: Type) -> TypeId;
    pub fn get(&self, id: TypeId) -> &Type;
    pub fn is_convertible(&self, from: TypeId, to: TypeId) -> bool;
    pub fn common_type(&self, t1: TypeId, t2: TypeId) -> Option<TypeId>;
}
```

---

### 6. **Symbol Table Module** (`crate::symbols`)
**Responsibility:** Track all declared symbols and their scopes

**Key Components:**
- Hierarchical scope management
- Symbol resolution with namespace support
- Template instantiation tracking
- Mangled name generation

**Data Structures:**
```rust
pub struct SymbolTable {
    scopes: Vec<Scope>,
    current_scope: ScopeId,
    symbols: HashMap<SymbolId, Symbol>,
}

pub struct Scope {
    parent: Option<ScopeId>,
    symbols: HashMap<String, SymbolId>,
    kind: ScopeKind,
}

pub enum ScopeKind {
    Global,
    Namespace(NamespaceId),
    Class(ClassId),
    Function(FunctionId),
    Block,
}

pub struct Symbol {
    pub id: SymbolId,
    pub name: String,
    pub kind: SymbolKind,
    pub type_id: TypeId,
    pub scope: ScopeId,
    pub visibility: Visibility,
}

pub enum SymbolKind {
    Variable,
    Function,
    Class,
    Namespace,
    TemplateParam,
    TypeAlias,
}

impl SymbolTable {
    pub fn enter_scope(&mut self, kind: ScopeKind) -> ScopeId;
    pub fn exit_scope(&mut self);
    pub fn insert(&mut self, name: String, symbol: Symbol) -> Result<SymbolId, SymbolError>;
    pub fn lookup(&self, name: &str) -> Option<SymbolId>;
    pub fn lookup_qualified(&self, path: &[String]) -> Option<SymbolId>;
}
```

---

### 7. **Template Instantiation Module** (`crate::templates`)
**Responsibility:** Handle template parsing, instantiation, and specialization

**Key Components:**
- Template parameter substitution
- Specialization matching
- Instantiation memoization
- SFINAE (Substitution Failure Is Not An Error) handling

**Interface:**
```rust
pub struct TemplateInstantiator {
    instantiation_cache: HashMap<(TemplateId, Vec<Type>), SymbolId>,
    substitution_stack: Vec<Substitution>,
}

pub struct TemplateDecl {
    pub params: Vec<TemplateParam>,
    pub declaration: Box<Declaration>,
}

pub enum TemplateParam {
    Type { name: String, default: Option<Type> },
    NonType { name: String, ty: Type, default: Option<Expr> },
    Template { name: String, params: Vec<TemplateParam> },
}

impl TemplateInstantiator {
    pub fn instantiate(
        &mut self,
        template: &TemplateDecl,
        args: &[TemplateArg],
    ) -> Result<Declaration, TemplateError>;
    
    fn substitute_type(&self, ty: &Type, substitution: &Substitution) -> Type;
    fn deduce_arguments(&self, template: &TemplateDecl, call_args: &[Type]) -> Result<Vec<TemplateArg>, DeductionError>;
}
```

---

### 8. **IR Generation Module** (`crate::irgen`)
**Responsibility:** Convert analyzed AST to intermediate representation

**Design Choice:** Generate LLVM IR directly rather than a custom IR to leverage LLVM's optimization passes.

**Key Components:**
- HIR (High-level IR) as an intermediate step
- LLVM IR emission
- Control flow graph construction
- Register allocation hints

**Interface:**
```rust
use inkwell::context::Context;
use inkwell::module::Module;
use inkwell::builder::Builder;

pub struct IRGenerator<'ctx> {
    context: &'ctx Context,
    module: Module<'ctx>,
    builder: Builder<'ctx>,
    symbol_map: HashMap<SymbolId, BasicValueEnum<'ctx>>,
}

impl<'ctx> IRGenerator<'ctx> {
    pub fn generate(&mut self, ast: &AnalyzedAST) -> Result<Module<'ctx>, IRGenError>;
    
    fn gen_function(&mut self, func: &Function) -> Result<FunctionValue<'ctx>, IRGenError>;
    fn gen_expr(&mut self, expr: &Expr) -> Result<BasicValueEnum<'ctx>, IRGenError>;
    fn gen_stmt(&mut self, stmt: &Stmt) -> Result<(), IRGenError>;
}
```

---

### 9. **Diagnostics Module** (`crate::diagnostics`)
**Responsibility:** Error reporting with helpful messages

**Key Components:**
- Error and warning definitions
- Source location tracking
- Multi-line error display with caret indicators
- Suggestion system for common mistakes

**Interface:**
```rust
pub struct DiagnosticEngine {
    diagnostics: Vec<Diagnostic>,
    source_map: SourceMap,
}

pub struct Diagnostic {
    pub level: DiagnosticLevel,
    pub message: String,
    pub span: Span,
    pub notes: Vec<String>,
    pub suggestions: Vec<Suggestion>,
}

pub enum DiagnosticLevel {
    Error,
    Warning,
    Note,
}

pub struct Suggestion {
    pub message: String,
    pub replacement: Option<String>,
    pub span: Span,
}

impl DiagnosticEngine {
    pub fn emit(&mut self, diagnostic: Diagnostic);
    pub fn report_error(&mut self, span: Span, message: impl Into<String>);
    pub fn report_warning(&mut self, span: Span, message: impl Into<String>);
    pub fn render(&self, writer: &mut dyn Write) -> std::io::Result<()>;
}
```

---

## Compilation Pipeline

### Detailed Phase Breakdown

#### **Phase 1: Lexical Analysis**
```
Input: Source file(s)
Process:
  1. Read source text
  2. Preprocessor directives (#include, #define)
  3. Tokenization
  4. Macro expansion
Output: Token stream
```

**Key Challenges:**
- Handling trigraphs and digraphs
- Raw string literals
- Universal character names
- Preprocessor state management

---

#### **Phase 2: Parsing**
```
Input: Token stream
Process:
  1. Build CST/AST from tokens
  2. Handle operator precedence
  3. Resolve syntactic ambiguities
  4. Error recovery
Output: Abstract Syntax Tree
```

**Key Challenges:**
- Template angle bracket disambiguation (`vector<vector<int>>` vs comparison)
- Most vexing parse (`T(x)` - declaration vs expression?)
- Function vs variable declaration ambiguity

---

#### **Phase 3: Semantic Analysis**
```
Input: AST
Process:
  1. Build symbol table
  2. Name resolution
  3. Type checking
  4. Overload resolution
  5. Template argument deduction
  6. Implicit conversion insertion
  7. Constant expression evaluation
Output: Annotated AST + Symbol Table
```

**Key Challenges:**
- Two-phase name lookup for templates
- Argument-dependent lookup (ADL/Koenig lookup)
- Template specialization matching
- SFINAE handling

---

#### **Phase 4: Template Instantiation**
```
Input: Annotated AST
Process:
  1. Identify template instantiation points
  2. Substitute template arguments
  3. Generate specialized versions
  4. Cache instantiations
Output: Expanded AST (no templates)
```

**Key Challenges:**
- Instantiation depth limits
- Recursive template instantiations
- Partial specialization matching
- Dependent name resolution

---

#### **Phase 5: IR Generation**
```
Input: Fully analyzed and expanded AST
Process:
  1. Convert AST to HIR
  2. Lower HIR to LLVM IR
  3. Generate vtables and RTTI
  4. Handle exception tables
  5. Generate debug information
Output: LLVM IR Module
```

**Key Challenges:**
- Virtual function dispatch lowering
- Constructor/destructor ordering
- Exception handling (stack unwinding)
- ABI compliance (calling conventions, name mangling)

---

#### **Phase 6: Optimization**
```
Input: LLVM IR
Process: (Delegated to LLVM)
  1. Function-level optimizations
  2. Interprocedural optimizations
  3. Loop optimizations
  4. Inlining
Output: Optimized LLVM IR
```

---

#### **Phase 7: Code Generation**
```
Input: Optimized LLVM IR
Process: (Delegated to LLVM backend)
  1. Instruction selection
  2. Register allocation
  3. Instruction scheduling
  4. Machine code emission
Output: Object file (.o)
```

---

#### **Phase 8: Linking**
```
Input: Object files
Process:
  1. Symbol resolution
  2. Relocation
  3. Standard library linking
Output: Executable binary
```

---

## Key Data Structures

### 1. **Arena Allocator for AST Nodes**
```rust
use typed_arena::Arena;

pub struct AstArena {
    expressions: Arena<Expr>,
    statements: Arena<Stmt>,
    declarations: Arena<Declaration>,
}

// Lifetimes tie AST node references to arena
impl AstArena {
    pub fn alloc_expr(&self, expr: Expr) -> &Expr {
        self.expressions.alloc(expr)
    }
}
```

**Rationale:** C++ compilers often use arena allocation for AST nodes to avoid frequent small allocations and simplify memory management.

---

### 2. **Interned Strings**
```rust
use string_interner::{StringInterner, Symbol};

pub struct StringPool {
    interner: StringInterner,
}

pub type InternedString = Symbol;

impl StringPool {
    pub fn intern(&mut self, s: &str) -> InternedString {
        self.interner.get_or_intern(s)
    }
    
    pub fn resolve(&self, sym: InternedString) -> &str {
        self.interner.resolve(sym).unwrap()
    }
}
```

**Rationale:** Identifiers are frequently compared; interning makes this O(1) and reduces memory usage.

---

### 3. **Source Location Tracking**
```rust
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct Span {
    pub start: BytePos,
    pub end: BytePos,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord)]
pub struct BytePos(pub u32);

pub struct SourceMap {
    files: Vec<SourceFile>,
}

pub struct SourceFile {
    pub name: String,
    pub source: String,
    pub line_starts: Vec<BytePos>,
}

impl SourceMap {
    pub fn lookup_line(&self, pos: BytePos) -> (usize, usize) {
        // Binary search to find line number and column
    }
}

#[derive(Debug, Clone)]
pub struct Spanned<T> {
    pub node: T,
    pub span: Span,
}
```

---

### 4. **Type Interning**
```rust
use indexmap::IndexMap;

pub struct TypeInterner {
    types: IndexMap<Type, TypeId>,
    next_id: u32,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub struct TypeId(u32);

impl TypeInterner {
    pub fn intern(&mut self, ty: Type) -> TypeId {
        if let Some(&id) = self.types.get(&ty) {
            id
        } else {
            let id = TypeId(self.next_id);
            self.next_id += 1;
            self.types.insert(ty, id);
            id
        }
    }
}
```

**Rationale:** Types are compared very frequently; interning provides O(1) equality checks.

---

### 5. **Control Flow Graph (CFG)**
```rust
pub struct ControlFlowGraph {
    pub blocks: Vec<BasicBlock>,
    pub entry: BlockId,
}

pub struct BasicBlock {
    pub id: BlockId,
    pub statements: Vec<Statement>,
    pub terminator: Terminator,
}

pub enum Terminator {
    Return(Option<Value>),
    Branch { condition: Value, then_block: BlockId, else_block: BlockId },
    Jump(BlockId),
    Unreachable,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub struct BlockId(pub usize);
```

---

## Recommended Rust Crates

### **Core Language Processing**

1. **`logos` (v0.13+)** - Lexer generation
   - **Why:** Fast, compile-time lexer generation with good error handling
   - **Alternative:** `nom` for parser combinators

2. **`chumsky` (v0.9+)** - Parser combinators (if not using hand-written parser)
   - **Why:** Excellent error recovery, good for prototyping
   - **Alternative:** Hand-written recursive descent (recommended for production)

3. **`lalrpop` (v0.20+)** - LR parser generator (alternative to hand-written)
   - **Why:** Good for unambiguous grammars
   - **Caveat:** C++ grammar has ambiguities that require manual handling

### **LLVM Integration**

4. **`inkwell` (v0.4+)** - Safe LLVM bindings
   - **Why:** Type-safe LLVM IR generation
   - **Critical:** Ensure LLVM version compatibility

5. **`llvm-sys` (v170+)** - Low-level LLVM bindings
   - **Why:** Direct access when inkwell is insufficient

### **Data Structures**

6. **`typed-arena` (v2.0+)** - Typed arena allocator
   - **Why:** Fast allocation for AST nodes

7. **`string-interner` (v0.17+)** - String interning
   - **Why:** Efficient identifier storage and comparison

8. **`indexmap` (v2.0+)** - Order-preserving hash maps
   - **Why:** Deterministic symbol table iteration

9. **`petgraph` (v0.6+)** - Graph data structures
   - **Why:** Control flow graphs, dominator trees

### **Error Handling**

10. **`codespan-reporting` (v0.11+)** - Beautiful diagnostic output
    - **Why:** Professional-quality error messages with source context

11. **`miette` (v7.0+)** - Modern error reporting
    - **Why:** Rich error types with helpful hints

### **Utilities**

12. **`dashmap` (v5.5+)** - Concurrent hash maps
    - **Why:** Thread-safe caching for template instantiations

13. **`rayon` (v1.8+)** - Data parallelism
    - **Why:** Parallel compilation of independent translation units

14. **`clap` (v4.5+)** - Command-line parsing
    - **Why:** Standard for CLI tools

15. **`serde` (v1.0+)** - Serialization
    - **Why:** For incremental compilation cache

### **Testing**

16. **`insta` (v1.34+)** - Snapshot testing
    - **Why:** Test AST structure without manual assertions

17. **`proptest` (v1.4+)** - Property-based testing
    - **Why:** Generate random C++ code for fuzzing

---

## Implementation Challenges

### **1. Template Two-Phase Name Lookup**

**Problem:** C++ templates require two-phase name lookup:
- Phase 1: Non-dependent names resolved at template definition
- Phase 2: Dependent names resolved at template instantiation

**Rust Implementation Challenge:**
```rust
// Need to defer type checking of dependent names
pub enum Name {
    Resolved(SymbolId),
    Dependent { name: String, context: Vec<TemplateParam> },
}

// Type checker must handle both cases
fn check_expression(&mut self, expr: &Expr) -> Result<TypeId, TypeError> {
    match expr {
        Expr::Variable(name) => match name {
            Name::Resolved(id) => Ok(self.get_type(*id)),
            Name::Dependent { .. } => Ok(self.make_dependent_type()),
        }
    }
}
```

**Solution Approach:**
- Maintain separate resolution contexts for template definitions vs instantiations
- Use a "delayed checking" queue for dependent expressions
- Store both resolved and unresolved names in the AST

---

### **2. Overload Resolution**

**Problem:** C++ overload resolution is complex with many rules for ranking candidates.

**Rust Implementation Challenge:**
```rust
pub struct OverloadCandidate {
    pub function: FunctionId,
    pub conversions: Vec<ConversionSequence>,
}

pub enum ConversionSequence {
    Exact,
    Promotion,
    Conversion { implicit: bool, rank: u32 },
    UserDefined { conversion_fn: FunctionId },
}

impl OverloadResolver {
    pub fn resolve(
        &self,
        candidates: &[FunctionId],
        args: &[TypeId],
    ) -> Result<FunctionId, OverloadError> {
        // Complex ranking algorithm
        let ranked = candidates.iter()
            .filter_map(|&func| self.try_match(func, args))
            .collect::<Vec<_>>();
        
        // Find the best match according to C++ rules
        self.find_best_viable(ranked)
    }
}
```

**Solution Approach:**
- Implement conversion sequence ranking according to C++ standard
- Handle special cases: constructors, conversion operators
- Support user-defined conversions
- Maintain a cache of resolved overloads

---

### **3. Name Mangling**

**Problem:** C++ name mangling for linking (Itanium ABI or Microsoft ABI).

**Rust Implementation Challenge:**
```rust
pub fn mangle_name(symbol: &Symbol, abi: MangleABI) -> String {
    match abi {
        MangleABI::Itanium => {
            // _ZN<namespace><class><function>E<parameter-types>
            let mut result = String::from("_Z");
            
            // Encode nested names
            if !symbol.scope_path.is_empty() {
                result.push('N');
                for component in &symbol.scope_path {
                    result.push_str(&format!("{}{}", component.len(), component));
                }
                result.push('E');
            }
            
            // Encode parameters for functions
            if let SymbolKind::Function(sig) = &symbol.kind {
                for param in &sig.params {
                    result.push_str(&mangle_type(&param.ty));
                }
            }
            
            result
        },
        MangleABI::MSVC => {
            // Microsoft C++ name mangling (very different)
            mangle_msvc(symbol)
        }
    }
}
```

**Solution Approach:**
- Support both Itanium (GCC/Clang) and MSVC ABIs
- Handle templates, namespaces, and nested classes
- Implement type encoding according to ABI specification

---

### **4. RTTI (Run-Time Type Information)**

**Problem:** Implementing `dynamic_cast`, `typeid`, and exception handling requires RTTI.

**Rust Implementation Challenge:**
```rust
pub struct TypeInfo {
    pub type_id: TypeId,
    pub name: String,
    pub base_classes: Vec<BaseClassInfo>,
    pub vtable_offset: Option<usize>,
}

pub struct BaseClassInfo {
    pub type_info: *const TypeInfo,
    pub offset: isize,
    pub flags: u32, // virtual, public, etc.
}

// Generate RTTI globals in LLVM IR
fn generate_type_info(&mut self, class: &ClassDecl) -> GlobalValue {
    // Create __type_info_XXX global
    let type_info = self.module.add_global(/* ... */);
    
    // Initialize with class metadata
    // ...
}
```

**Solution Approach:**
- Generate RTTI structures according to C++ ABI
- Implement virtual base class offset calculations
- Support cross-casting with `dynamic_cast`

---

### **5. Virtual Function Dispatch**

**Problem:** Implementing vtables and virtual function calls.

**Rust Implementation Challenge:**
```rust
pub struct VTable {
    pub entries: Vec<VTableEntry>,
}

pub enum VTableEntry {
    Function(FunctionId),
    Offset(isize), // For multiple inheritance
    RTTI(*const TypeInfo),
}

fn generate_vtable(&mut self, class: &ClassDecl) -> GlobalValue {
    let mut entries = vec![];
    
    // Add RTTI pointer
    entries.push(VTableEntry::RTTI(self.get_type_info(class.id)));
    
    // Collect virtual functions from base classes
    for base in &class.bases {
        entries.extend(self.get_vtable(base.class_id).entries.clone());
    }
    
    // Override with this class's virtual functions
    for method in &class.methods {
        if method.is_virtual {
            // Find slot to override or add new slot
            let slot = self.find_virtual_slot(&method.name, &entries);
            entries[slot] = VTableEntry::Function(method.id);
        }
    }
    
    // Emit as LLVM global
    self.emit_vtable_global(entries)
}
```

**Solution Approach:**
- Build vtables during class definition
- Handle multiple inheritance with offset adjustments
- Support virtual inheritance (most complex case)

---

### **6. Exception Handling**

**Problem:** Implementing C++ exceptions with proper stack unwinding.

**Rust Implementation Challenge:**
```rust
fn generate_try_catch(&mut self, try_stmt: &TryStmt) -> Result<(), IRGenError> {
    // Create landing pad basic block
    let landing_pad = self.builder.append_basic_block("catch.landingpad");
    
    // Generate try block with invoke instructions instead of calls
    for stmt in &try_stmt.try_block {
        if let Stmt::Expression(Expr::FunctionCall { .. }) = stmt {
            // Use invoke instead of call
            self.builder.build_invoke(
                function,
                args,
                normal_dest,
                landing_pad, // exception destination
                "invoke",
            );
        }
    }
    
    // Generate catch handlers
    self.builder.position_at_end(landing_pad);
    let caught = self.builder.build_landing_pad(/* ... */);
    
    for handler in &try_stmt.catch_clauses {
        // Generate type matching and handler code
    }
}
```

**Solution Approach:**
- Use LLVM's exception handling primitives (invoke, landing pad)
- Implement stack unwinding with personality functions
- Support catch-by-value and catch-by-reference
- Handle destructors during unwinding

---

### **7. Const Expression Evaluation**

**Problem:** C++ requires compile-time evaluation of const expressions.

**Rust Implementation Challenge:**
```rust
pub struct ConstEvaluator {
    values: HashMap<SymbolId, ConstValue>,
}

pub enum ConstValue {
    Int(i64),
    Float(f64),
    String(String),
    Array(Vec<ConstValue>),
    Struct(HashMap<String, ConstValue>),
}

impl ConstEvaluator {
    pub fn evaluate(&mut self, expr: &Expr) -> Result<ConstValue, ConstEvalError> {
        match expr {
            Expr::Literal(lit) => Ok(self.literal_to_const(lit)),
            Expr::BinaryOp { op, lhs, rhs } => {
                let lhs_val = self.evaluate(lhs)?;
                let rhs_val = self.evaluate(rhs)?;
                self.apply_binop(op, lhs_val, rhs_val)
            }
            Expr::FunctionCall { func, args } if self.is_constexpr_function(func) => {
                // Interpret constexpr function at compile-time
                self.interpret_constexpr_call(func, args)
            }
            _ => Err(ConstEvalError::NotConstant),
        }
    }
}
```

**Solution Approach:**
- Implement an interpreter for constexpr functions
- Handle all operations allowed in constant expressions
- Cache evaluated constants
- Support constexpr constructors and destructors

---

### **8. Template Metaprogramming**

**Problem:** Templates can perform Turing-complete computation at compile-time.

**Rust Implementation Challenge:**
```rust
pub struct TemplateInstantiationStack {
    stack: Vec<(TemplateId, Vec<TemplateArg>)>,
    max_depth: usize,
}

impl TemplateInstantiationStack {
    pub fn push(
        &mut self,
        template: TemplateId,
        args: Vec<TemplateArg>,
    ) -> Result<(), TemplateError> {
        // Check for recursion
        if self.stack.iter().any(|(t, a)| *t == template && a == &args) {
            return Err(TemplateError::RecursiveInstantiation);
        }
        
        // Check depth limit
        if self.stack.len() >= self.max_depth {
            return Err(TemplateError::InstantiationDepthExceeded);
        }
        
        self.stack.push((template, args));
        Ok(())
    }
}
```

**Solution Approach:**
- Implement instantiation depth limits
- Detect and handle recursive instantiations
- Use memoization to avoid redundant instantiations
- Support SFINAE for template metaprogramming patterns

---

### **9. Argument-Dependent Lookup (ADL)**

**Problem:** ADL adds associated namespaces to lookup based on argument types.

**Rust Implementation Challenge:**
```rust
fn resolve_with_adl(&self, name: &str, args: &[TypeId]) -> Vec<SymbolId> {
    let mut candidates = vec![];
    
    // Normal lookup
    candidates.extend(self.symbol_table.lookup(name));
    
    // ADL: look in associated namespaces of argument types
    for arg_type in args {
        let associated_namespaces = self.get_associated_namespaces(*arg_type);
        for ns in associated_namespaces {
            if let Some(sym) = self.symbol_table.lookup_in_namespace(ns, name) {
                candidates.push(sym);
            }
        }
    }
    
    candidates
}

fn get_associated_namespaces(&self, ty: TypeId) -> Vec<NamespaceId> {
    match self.type_registry.get(ty) {
        Type::Class(class_id) => {
            vec![self.get_class_namespace(*class_id)]
        }
        Type::Pointer(inner) => self.get_associated_namespaces(*inner),
        // ... more cases
        _ => vec![],
    }
}
```

**Solution Approach:**
- Track namespace associations for all types
- Combine normal lookup with ADL results
- Handle friend declarations that affect ADL

---

### **10. Move Semantics and Perfect Forwarding**

**Problem:** Implementing rvalue references, std::move, and std::forward.

**Rust Implementation Challenge:**
```rust
pub enum ValueCategory {
    LValue,
    RValue,
    XValue, // Expiring value (result of std::move)
}

impl TypeChecker {
    fn get_value_category(&self, expr: &Expr) -> ValueCategory {
        match expr {
            Expr::Variable(_) => ValueCategory::LValue,
            Expr::FunctionCall { .. } => {
                // Depends on return type (T vs T&&)
                let return_type = self.get_return_type(expr);
                if self.is_rvalue_reference(return_type) {
                    ValueCategory::XValue
                } else {
                    ValueCategory::RValue
                }
            }
            Expr::MemberAccess { object, .. } => {
                self.get_value_category(object)
            }
            _ => ValueCategory::RValue,
        }
    }
}
```

**Solution Approach:**
- Track value categories throughout type checking
- Implement move constructor/assignment generation
- Handle reference collapsing rules
- Support perfect forwarding patterns

---

## Design Decisions and Tradeoffs

### **1. Parser Strategy: Hand-Written vs Generated**

**Decision:** Hand-written recursive descent parser

**Rationale:**
- C++ grammar has numerous ambiguities that are hard to express in parser generators
- Better error messages and recovery
- More control over parsing details (template angle brackets, etc.)
- Easier to debug

**Tradeoff:** More initial implementation effort, but pays off in maintainability.

---

### **2. IR Strategy: Custom vs LLVM**

**Decision:** Use LLVM IR directly

**Rationale:**
- Leverage LLVM's mature optimization passes
- Avoid maintaining a custom optimizer
- Easier interoperability with existing C++ code
- Standard ABI compliance

**Tradeoff:** Tight coupling to LLVM, larger binary size.

---

### **3. Type Representation: Interned vs Direct**

**Decision:** Type interning with TypeId handles

**Rationale:**
- O(1) type equality checks (critical for performance)
- Reduced memory usage (types are shared)
- Simplifies type comparison logic

**Tradeoff:** Requires a global type registry, slightly more complex API.

---

### **4. Memory Management: Arena vs Rc/Arc**

**Decision:** Arena allocation for AST, Rc for symbol table

**Rationale:**
- Arena allocation is faster and simpler for parse-once data
- Symbol table needs longer lifetime and is frequently shared
- No cycles in AST structure make arena safe

**Tradeoff:** Less flexible but better performance.

---

### **5. Parallelization Strategy**

**Decision:** Translation unit-level parallelism

**Rationale:**
- Easy to parallelize (translation units are independent)
- Good scaling for large projects
- Simple implementation with rayon

**Tradeoff:** No intra-TU parallelism, but this is rarely worth the complexity.

---

### **6. Error Recovery**

**Decision:** Panic mode with synchronization points

**Rationale:**
- Simple to implement
- Provides reasonable error messages
- Allows continued parsing after errors

**Tradeoff:** May produce cascading errors, but acceptable for most use cases.

---

### **7. Template Instantiation: Eager vs Lazy**

**Decision:** Lazy instantiation (only when needed)

**Rationale:**
- Reduces compilation time
- Matches C++ semantics
- Avoids instantiating unused template specializations

**Tradeoff:** More complex implementation, requires instantiation tracking.

---

## Conclusion

Building a C++ compiler in Rust is a significant undertaking, but Rust's type system and memory safety guarantees provide excellent tools for managing the complexity. The key challenges revolve around:

1. **C++'s complex grammar** - Requires careful parser design
2. **Template system** - Needs sophisticated instantiation and caching
3. **Type system** - Requires rich type representation and relationships
4. **ABI compliance** - Must match platform conventions exactly
5. **RTTI and exceptions** - Complex runtime support

The modular architecture presented here allows for incremental development, starting with a minimal subset and gradually adding features. The use of LLVM for code generation significantly reduces the complexity of the backend, allowing focus on the frontend challenges unique to C++.

**Next Steps:**
1. Implement lexer and parser for a C++ subset
2. Build basic semantic analysis
3. Generate simple LLVM IR
4. Incrementally add features (classes, templates, etc.)
5. Add optimization and polish

This architecture provides a solid foundation for a production-quality C++ compiler while maintaining the safety and ergonomics that Rust provides.
