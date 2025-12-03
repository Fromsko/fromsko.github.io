# graphene

# graphene 源码解读

## 工具类

> `props.py` 获取类中的字段数据

```python
class _OldClass:
    pass  # 定义一个空类 _OldClass


class _NewClass:
    pass  # 定义一个空类 _NewClass


# 获取 _OldClass 和 _NewClass 的所有属性和方法名，并去重
_all_vars = set(dir(_OldClass) + dir(_NewClass))


def props(x):
    """提取类或对象的属性，排除 _OldClass 和 _NewClass 中的属性"""
    return {
        key: vars(x).get(key, getattr(x, key))  # 获取对象 x 中每个属性的值
        for key in dir(x)  # 遍历对象 x 的所有属性和方法名
        if key not in _all_vars  # 排除在 _all_vars 中的属性和方法名
    }


class Base:
    name: str = "fromsko"
    age: int = 18

    def demo(self):
        ...

    @staticmethod
    def demo_static():
        ...

    @classmethod
    def demo_class():
        ...

    @property
    def demo_property() -> str:
        return ''


""" {
    '__annotations__': {'name': <class 'str'>, 'age': <class 'int'>},
    'demo': <function Base.demo at 0x000001CB62FFCFE0>,
    'demo_class': <classmethod(<function Base.demo_class at 0x000001CB62FFD120>)>,
    'demo_property': <property object at 0x000001CB62FD5440>,
    'demo_static': <staticmethod(<function Base.demo_static at 0x000001CB62FFD080>)>,
    'name': 'fromsko',
    'age': 18
}
"""
print(props(Base))
```

`类中一些操作:`

```python
# 删除某个属性
delattr(cls, "Meta")

# 判断是否有这个属性
hasattr(super_class, "__init_subclass_with_meta__")

# 获取属性
_Meta = getattr(cls, "Meta", None)  # 获取子类的 Meta 属性

# 创建子类时自动调用
def __init_subclass__(cls, **meta_options): ...

# 重写属性设置方法
def __setattr__(self, name, value):
    # 重写属性设置方法，如果对象被冻结，则禁止修改属性
    if not self._frozen:
        super(BaseOptions, self).__setattr__(name, value)
    else:
        raise Exception(f"Can't modify frozen Options {self}")

```

`基础类型的使用`

```python
# 合并元数据选项
options = dict(meta_options, **_meta_props)

# 提取 abstract 选项
abstract = options.pop("abstract", False)
```

`文档处理`

```python
import inspect


def trim_docstring(docstring): # NOTE: 去除一些文档空格，返回整洁的文档注释
    # Cleans up whitespaces from an indented docstring
    #
    # See https://www.python.org/dev/peps/pep-0257/
    # and https://docs.python.org/2/library/inspect.html#inspect.cleandoc
    return inspect.cleandoc(docstring) if docstring else None
```

`继承相关`

```python
def get_type(self):
    """
        当 UnmountedType 实例作为 Field、InputField 或 Argument 被挂载时调用此函数
        """
    raise NotImplementedError(f"get_type 未在 {self} 中实现")
# NotImplementedError 抛出异常，未被实现
```

## 好的代码设计

### 实例计数器的实现

```python
from functools import total_ordering


@total_ordering
class OrderedType:
    creation_counter = 1  # 类变量，用于记录创建的实例数量

    def __init__(self, _creation_counter=None):
        # 初始化时设置创建计数器
        self.creation_counter = _creation_counter or self.gen_counter()

    @staticmethod
    def gen_counter():
        # 生成唯一的创建计数器值
        counter = OrderedType.creation_counter
        OrderedType.creation_counter += 1  # 递增类计数器
        return counter

    def reset_counter(self):
        # 重置当前实例的创建计数器
        self.creation_counter = self.gen_counter()

    def __eq__(self, other):
        # 等于比较（用于 @total_ordering）
        if isinstance(self, type(other)):
            return self.creation_counter == other.creation_counter
        return NotImplemented

    def __lt__(self, other):
        # 小于比较（用于 @total_ordering）
        if isinstance(other, OrderedType):
            return self.creation_counter < other.creation_counter
        return NotImplemented

    def __gt__(self, other):
        # 大于比较（用于 @total_ordering）
        if isinstance(other, OrderedType):
            return self.creation_counter > other.creation_counter
        return NotImplemented

    def __hash__(self):
        # 返回当前实例的哈希值
        return hash(self.creation_counter)
```

## 拓展

### super 超类

`super()` 是 Python 中用于调用父类（超类）方法的内置函数，它可以帮助你在子类中访问父类的方法。`super()` 的传入参数主要有两个：

1. **类名**：通常是当前类的名称，用于指定要访问哪个类的父类方法。例如，在 `super(BaseType, cls)` 中，`BaseType` 表示我们想要从 `BaseType` 的父类中调用方法。
2. **实例或类**：这是当前类的实例或类对象。在类方法中，通常传入 `cls`，表示当前类；在实例方法中，通常传入 `self`，表示当前实例。

### 示例

```python
class Parent:
    def greet(self):
        print("Hello from Parent!")

class Child(Parent):
    def greet(self):
        super(Child, self).greet()  # 调用 Parent 的 greet 方法
        print("Hello from Child!")

child_instance = Child()
child_instance.greet()
```

在这个例子中：

- `super(Child, self)` 使得 `Child` 类可以访问 `Parent` 类的 `greet` 方法。

### 总结

- 第一个参数是类名，指定了要查找其父类的方法。
- 第二个参数是实例或类对象，表示要在这个上下文中查找父类的方法。

`super()` 的使用简化了多重继承中的方法解析（MRO），并确保可以正确访问父类的方法，避免了直接引用父类的需要。

---

### `__new__`方法

`__new__` 方法是一个特殊的方法，用于创建类的实例。在 Python 中，`__new__` 方法在对象实例化之前被调用，负责返回一个新的实例。它通常用于自定义类的创建过程，尤其是在使用元类时。

在你提供的代码中，`__new__` 方法的定义如下：

```python
def __new__(cls, name_, bases, namespace, **options):
```

### 参数解析：

- `cls`: 指向当前正在创建的类的引用。这是元类的实例。
- `name_`: 类的名称。
- `bases`: 类的基类元组（即父类）。
- `namespace`: 类的命名空间，包含类属性和方法。
- `**options`: 其他可选的关键字参数，用于传递额外的选项。

### 功能：

1. **创建新类**：在 `__new__` 方法中，可以使用 `super()` 调用父类的 `__new__` 方法，来创建一个新类。
2. **动态添加属性**：可以根据传入的 `options` 参数或其他逻辑动态地修改类的属性或方法。
3. **返回类对象**：`__new__` 方法必须返回一个类对象，这个对象会成为实际的类。

### 示例：

在你提供的代码中，`__new__` 方法的主要功能是创建一个新的类，并将其与 `InterObjectType` 进行组合。随后，如果元数据 `_meta` 存在，则会创建相应的数据类属性。这种结构允许在创建新类型时添加额外的逻辑或属性。

```python
base_cls = super().__new__(
    cls, name_, (InterObjectType,) + bases, namespace, **options
)
```

这里调用了父类的 `__new__` 方法，以 `InterObjectType` 和基类一起创建一个新的类。这个新的类将会包含所有的字段和属性定义，形成最终的对象类型。
