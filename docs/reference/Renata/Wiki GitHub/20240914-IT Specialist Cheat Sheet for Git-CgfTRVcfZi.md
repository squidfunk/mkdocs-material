# IT Specialist Cheat Sheet for Git



## 1. Advanced Repository Management

- **Create Bare Repositories:**
  - Use a `bare` repository for server storage locations:
  ```bash
  git init --bare <repository-name>.git
  ```

- **Manage Hooks:**
  - Write and manage Git hooks (e.g., `pre-commit`, `post-merge`) to perform custom actions:
  - Example of a `pre-commit` hook:
  ```bash
  #!/bin/sh
  # Prevent commits with empty messages
  if test -z "$(git log -1 --pretty=%B)"; then
    echo "Commit message cannot be empty." >&2
    exit 1
  fi
  ```

- **Remote Repository Management:**
  - Manage and configure multiple remotes:
  ```bash
  git remote set-url --add <name> <new-url>
  ```

## 2. Security and Compliance Management

- **SSH Access and Authentication:**
  - Use SSH keys for secure authentication:
  ```bash
  ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
  ```

- **Create Signed Commits:**
  - Use `GPG` to sign commits:
  ```bash
  git commit -S -m "Signed commit"
  ```

- **Audit Trails and Logging:**
  - Configure advanced logging and audit trails with `git log` and custom hooks.

## 3. Performance Optimization

- **Manage Large Repositories:**
  - Use `git-lfs` (Large File Storage) for large binary files:
  ```bash
  git lfs install
  git lfs track "*.psd"
  ```

- **Use Rebase Instead of Merge:**
  - Minimize the number of merges by using `git rebase`.

- **Efficient Branching Strategies:**
  - Implement efficient branching strategies like **Git Flow** or **Trunk-Based Development**.

## 4. Disaster Recovery and Backup

- **Regular Git Server Backups:**
  - Implement backup strategies with tools like `rsync` or `git bundle`:
  ```bash
  git bundle create <backup-file>.bundle --all
  ```

- **Recover Lost Commits:**
  - Use `git reflog` to recover lost commits and changes:
  ```bash
  git reflog
  git checkout <commit-hash>
  ```

## 5. Support and Maintenance

- **Create Git Server Architectures:**
  - Plan and implement Git server architectures for high availability and load balancing.

- **Training and Documentation for Developers:**
  - Develop training and documentation for developers to ensure best practices in using Git.

- **Regular Security Audits:**
  - Conduct regular security audits to identify vulnerabilities in the repository setup.
