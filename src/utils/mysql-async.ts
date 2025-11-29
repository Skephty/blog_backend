export function queryAsync(connection: any, sql: string, values?: any[]): Promise<any[]> {
    return new Promise((resolve, reject) => {
        connection.query(sql, values, (error: any, results: any) => {
            if (error) reject(error);
            else resolve(results);
        });
    });
}