# Trie

> 也是去年看过的，但之后基本没用过，前两天 Div. 3 的 G 题要用，正好再看看，顺便加到博客里来。🤓🤓🤓

### 检索字符串

#### [洛谷P2580](https://www.luogu.com.cn/problem/P2580)

这个还是比较基础的，属于是模板题了。

```cpp
void ChatGptDeepSeek() // Date: 2025-04-10
{                      // Time: 10:31:36
    int n;
    cin >> n;
    vector<vector<int>> trie(n * 51, vector<int>(26, 0));
    vector<bool> word(n * 51), vis(n * 51);
    int tot = 0;
    auto Insert = [&](string s)
    {
        int cur = 0;
        for (auto x : s)
        {
            if (trie[cur][x - 'a'] == 0)
                trie[cur][x - 'a'] = ++tot;
            cur = trie[cur][x - 'a'];
        }
        word[cur] = true;
    };
    auto Find = [&](string s)
    {
        int cur = 0;
        for (auto x : s)
        {
            if (trie[cur][x - 'a'] == 0)
            {
                cout << "WRONG\n";
                return;
            }
            cur = trie[cur][x - 'a'];
        }
        if (vis[cur])
            cout << "REPEAT\n";
        else if (word[cur])
            cout << "OK\n", vis[cur] = true;
        else
            cout << "WRONG\n";
    };
    for (int i = 1; i <= n; i++)
    {
        string x;
        cin >> x;
        Insert(x);
    }
    int m;
    cin >> m;
    while (m--)
    {
        string x;
        cin >> x;
        Find(x);
    }
}
```